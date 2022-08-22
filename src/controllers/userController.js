const userModel = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const saltKey = bcrypt.genSaltSync(14);

class userController{

    static async registerUser(req, res){
        const EmailExist = await userModel.findOne({email: req.body.email});
        if(EmailExist)  return res.status(400).send("Não foi possível cadastrar esse e-mail, pois ele já foi cadastrado!")       
        
        const cryptPassword = bcrypt.hashSync(req.body.password, saltKey)

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


        const token = jwt.sign({_id: userSelected.id}, process.env.SECRET_TOKEN)


        res.header('authorization-token', token);


        res.status(202).send("User Logged!")

    }
}

module.exports = userController;