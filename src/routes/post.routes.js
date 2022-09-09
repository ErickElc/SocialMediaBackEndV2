const express = require('express');
const postController = require('../controllers/postController.js');


const routerPosts = express.Router();


routerPosts
    .get('/posts/all', postController.listPost)
    .get('/posts/:id', postController.listPostForUser)
    .post('/posts/new', postController.sendPost)


module.exports = routerPosts;