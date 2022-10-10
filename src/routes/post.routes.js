const express = require('express');
const multer = require('multer');
const postController = require('../controllers/postController.js');
const multerConfig = require('../config/multer');

const routerPosts = express.Router();


routerPosts
    .get('/posts/all', postController.listPost) // RF 09
    .get('/posts/:id', postController.listPostForUser) // RF 11 | RF(14)/ RF(16)
    .post('/posts/new', multer(multerConfig).single('file') , postController.sendPost) // RF 08
    .post('/posts/:id', postController.editPost) // RF 10


module.exports = routerPosts;