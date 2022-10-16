const userModel = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const saltKey = bcrypt.genSaltSync(14);

/// Controles do usuário --- RF (01 a 07);

class userController{

    // RF (01) WORKING

    static async registerUser(req, res){
        const EmailExist = await userModel.findOne({email: req.body.email});
        if(EmailExist)  return res.status(400).send("Não foi possível cadastrar esse e-mail, pois ele já foi cadastrado!");     
        const cryptPassword = bcrypt.hashSync(req.body.password, saltKey);
        const userRegister = new userModel({
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            password: cryptPassword,
        });
        try{
            await userRegister.save();
            res.status(201).send("Usuário cadastrado!")
        }
        catch(err){
            res.status(500).send(`Houve um erro: ${err}`)
        }

    }
    // RF (02) WORKING
    
    static async loginUser(req, res){                                                            
        const userSelected = await userModel.findOne({email: req.body.email});
        if(!userSelected) return res.status(400).send("Email or password incorrect");
        const passwordMatch = bcrypt.compareSync(req.body.password, userSelected.password);

        if(!passwordMatch) return res.status(400).send("Email or password incorrect");

        const token = jwt.sign({_id: userSelected.id}, process.env.SECRET_TOKEN,{
            expiresIn: '12h'
        });
        res.status(202).send(token);
    }
    // RF (03) WORKING

    static async recoverPassword(req, res){
        if(!req.body.email) return res.status(400).send('Não foi possível recuperar a senha, pois o e-mail não foi informado!');
        try {
            const userSelected = await userModel.findOne({email: req.body.email});
            if(userSelected.age != req.body.age) return res.status(400).send('Não foi possível recuperar a senha, pois a idade não confere!');
            const cryptPassword = bcrypt.hashSync(req.body.password, saltKey);
            await userModel.updateOne({email: req.body.email}, {$set:{
                password: cryptPassword
            }});
            res.status(200).send('Senha alterada com sucesso!');
        } catch (error) {
            res.status(400).send('Houve um erro: ' + error);
        }
    }
    // RF(04) WORKING
    
    static async listOneUser(req, res){
        const id = req.params.id;
        if(!id)return res.status(400).send('Não foi possível listar o usuário, pois o id não foi informado!');
        try {
            const userSelected = await userModel.findOne({_id: id});
              const userData = {
                _id: userSelected._id,
                name: userSelected.name,
                age: userSelected.age,
                email: userSelected.email,
                createdDate: userSelected.createdDate
            };
            res.status(200).send(userData);
        } catch (error) {
            res.status(400).send('Houve um erro: ' + error);
        }
    }
    // RF(04) Working
    static async listOneEmail(req, res){
        if(!token) return res.stauts(400).send('Não foi possível executar essa ação');
        try {
            const authorization = jwt.verify(req.body.token, process.env.SECRET_TOKEN);
            if(!authorization)return res.status(403).send('Não foi possível editar os dados do usuário!');
            const userSelected = await userModel.findOne({email: req.body.email});
            const userData = {
                _id: userSelected._id,
                name: userSelected.name,
                age: userSelected.age,
                email: userSelected.email,
                createdDate: userSelected.createdDate
            }
            res.status(200).send(userData)
        } catch (error) {
            res.status(500).send('Não foi possível executar essa ação');
        }
    }
    // RF(05) WORKING
    static async editUserData(req, res){
        try {
            const authorization = jwt.verify(req.body.token, process.env.SECRET_TOKEN);
            if(!authorization)return res.status(403).send('Não foi possível editar os dados do usuário!');
            const cryptPassword = bcrypt.hashSync(req.body.password, saltKey);
            await userModel.updateOne({_id: req.params.id}, {$set:{
                name: req.body.name,
                age: req.body.age,
                email: req.body.email,
                password: cryptPassword
            }});
            res.status(200).send('Dados do usuário editados com sucesso!');
        } catch (error) {
            res.status(404).send('Houve um erro: ' + error);
        }
    }
    //RF (06) WORKING
    static async habilitarPerfil(req, res){
        try {
            const authorization = jwt.verify(req.body.token, process.env.SECRET_TOKEN);
            if(!authorization)return res.status(403).send('Não foi possível editar os dados do usuário!');
            await userModel.updateOne({email: req.body.email}, {$set:{
                habilitado: req.body.habilitado
            }});
            res.status(200).send((req.body.habilitado === true) ? 'Habilitado!' : "desabilitado");
        } catch (error) {
            res.status(400).send('Houve um erro: ' + error);
        }
    }
    //RF (07)  WORKING
    static async deleteUser(req, res){
        const id = req.params.id;  
        if(!id)return res.status(400).send('Não foi possível deletar o usuário, pois o id não foi informado!');
        try {
            const authorization = jwt.verify(req.body.token, process.env.SECRET_TOKEN);
            if(!authorization)return res.status(403).send('Não foi possível deletar o usuário!');
            await userModel.findOneAndRemove({_id: req.params.id});
            res.status(200).send('Usuário deletado com sucesso!');
        } catch (error) {
            res.status(400).send('Houve um erro: ' + error);
        }
    }
    //RF (13) WORKING
    static async listAllUsers(req, res){
        try {
            const userSelected = await userModel.find().populate({path: "_id" ,selected: '_id name age email createdDate'}).exec();
            res.status(200).send(userSelected);
        } catch (error) {
            res.status(400).send('Houve um erro: ' + error);
        }
    }
}
module.exports = userController;