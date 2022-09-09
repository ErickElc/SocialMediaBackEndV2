const postModel = require("../models/Posts");
const jwt = require("jsonwebtoken");


// Controle das publicações --- RF(08 a 12);

class postController{

    static async listPost(req, res){
        try {
            const posts = await postModel.find().populate({path:'autor', select: 'name email createdDate age'}).exec()
            res.status(200).send(posts);
            
        } catch (error) {
            res.status(400).send(error);
        }
    }
    static async listPostForUser(req, res){
        const id = req.params.id;
        try {
            const listPost = await postModel.findOne({_id: id});
            res.status(200).send(listPost);
        } 
        catch (error) {
            res.status(400).send(error);
        }
    }
    static async sendPost(req, res){
        const post = new postModel({
            content: req.body.content,
            autor: req.body.autor
        })
        try {
            const authorization = jwt.verify(req.body.token, process.env.SECRET_TOKEN);
            if(authorization == 403){
                return res.status(500).send(`Não foi possível enviar o post ${error}`)
            }
            await post.save();
            res.status(201).send("Post Enviado!");

        } catch (error) {
            res.status(500).send(`Não foi possível enviar o post ${error}`)
        }
    }
}

module.exports = postController;