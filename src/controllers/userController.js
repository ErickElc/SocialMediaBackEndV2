const userModel = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const saltKey = bcrypt.genSaltSync(14);
/// Controles do usuário --- RF (01 a 07);
class userController{

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
    static async UserData (req, res){
        try {
            const userSelected = await userModel.findOne({email: req.body.email});
            const authorization = jwt.verify(req.body.token, process.env.SECRET_TOKEN);
            if(authorization.status === 403){
                return res.status(400).send('Não foi possível pegar o dados do usuário!');
            }
            const userData = {
                id_: userSelected._id,
                name: userSelected.name,
                age: userSelected.age,
                admin: userSelected.admin,
                createdDate: userSelected.createdDate
            };
            res.status(200).send(userData);
        } catch (error) {
            res.status(400).send('Não foi possível pegar o dados do usuário!' + error);
        }
    }
}

module.exports = userController;