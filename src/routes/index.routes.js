const express = require("express");
const router = require("./user.routes.js");
const routerAdmin = require("./admin.routes.js");
const routerPosts = require("./post.routes.js");
const routerComments = require("./comments.routes.js");





const routes = app =>{
    app.use(
        '/api',
        express.urlencoded({ extended: false }),
        router,
        routerPosts,
        routerComments
    )
    app.use(
        '/admin',
        express.urlencoded({ extended: false }),
        routerAdmin
        )
}


module.exports = routes;

