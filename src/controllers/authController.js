const jwt = require('jsonwebtoken');
class authController{
    static async authController(req, res, next){
        const token = req.body.token
        if(!token) return res.status(403).send("Acess Denied");
        try{
            const userVerifed = jwt.verify(token, process.env.SECRET_TOKEN);
            req.user = userVerifed;
            next();
        }
        catch(err){
            res.status(403).send("Acess Denied");
        }
    }
}
module.exports = authController;