const postModel = require("../models/Posts");
const jwt = require("jsonwebtoken");
const google = require('googleapis');
const UploadImage = require("../uploadImages/upload");
const driveId = "1XFhXVJtzv3MHDU1svOY5hoQVcgyr3Ovy";

// Controle das publicações --- RF(08 a 12);

class postController{

    // RF(08) - 
    static async sendPost(req, res){
        const image_url = await UploadImage(req.body.imagem)
        console.log(image_url)
        const post = new postModel({
            content: req.body.content,
            autor: req.body.autor,
            url_image: image_url 
        })

        try {
            const authorization = jwt.verify(req.body.token, process.env.SECRET_TOKEN);
            if(authorization == 403) return res.status(500).send(`Não foi possível enviar o post ${error}`)
            
            await post.save();
            res.status(201).send("Post Enviado!");

        } catch (error) {
            res.status(500).send(`Não foi possível enviar o post ${error}`)
        }
    }
    //RF (09) WORKING
    static async listPost(req, res){
        try {
            const posts = await postModel.find().populate({path:'autor', select: 'name email createdDate age'}).exec()
            res.status(200).send(posts);
        } catch (error) {
            res.status(400).send(error);
        }
    }
    //RF (10) WORKING
    static async editPost(req, res){
        const {id} = req.params;
        try {
            await postModel.findOneAndUpdate({_id: id},{$set:{
                content: req.body.content,
                image_url: req.body.image_url
            }})
            res.status(200).send('Post atualizado com sucesso!');
        } catch (error) {
            res.status(500).send('Ocorreu um erro, tente novamente mais tarde')
        }
    }
    //RF (11) WORKING AND RF(14)/ RF(16)
    static async listPostForUser(req, res){
        const id = req.params.id;
        try {
            const userPost = await postModel.find({autor: id}).populate({path:'autor', select: 'name email createdDate age'}).exec();
            res.status(200).send(userPost);
        } 
        catch (error) {
            res.status(400).send(error);
        }
    }
}

module.exports = postController;