const express = require('express');
const multer = require('multer');
const postController = require('../controllers/postController.js');
const multerConfig = require('../config/multer');

const routerPosts = express.Router();


routerPosts
    .get('/posts/list/all', postController.listPost) // RF 09 POST LIST ALL
    .get('/posts/list/:id', postController.listPostForUser) // RF 11 | RF(14)/ RF(16) POST LIST FOR USER
    .post('/posts/new', multerConfig.single('file') , postController.sendPost) // RF 08 POST CREATE
    .put('/posts/edit/:id',  multerConfig.single('file') , postController.editPost) // RF 10 POST EDIT
    .delete('/posts/delete/:id', postController.deletePost) // RF 12 POST DELETE


module.exports = routerPosts;