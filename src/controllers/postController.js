const postModel = require("../models/Posts");

class postController{

    static async sendPost(req, res){
        const post = new postModel({
            title: req.body.title,
            files: req.body.files,
            autor: req.body.autor
        })
        try {
            await post.save();
            res.status(201).send("Post Enviado!");



        } catch (error) {
            res.status(500).send(`Não foi possível enviar o post ${error}`)
        }




    }


}

module.exports = postController;