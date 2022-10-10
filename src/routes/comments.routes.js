const express = require("express");
const commentsController = require('../controllers/commentsController');

const routerComments  = express.Router();


routerComments
    .get('/comments/list/all', commentsController.listAllComments)
    .get('/comments/list/:id', commentsController.listPostComments)
    .post('/comments/new/:id', commentsController.createComment)



module.exports = routerComments;