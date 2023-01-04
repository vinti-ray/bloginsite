//________for Authentication______________
let jwt=require('jsonwebtoken')
const checkToken=function(req,res,next){
    let token=req.headers['token']
    if(!token)  return res.send({msg:"request is missing mandatory header"})
    let verifyToken=jwt.verify(token,"new_seceret_key")
    if(!verifyToken) return res.status(401).send({ msg: "invalid token" });

    let idFromParam = req.params.userId;
    let idFromToken = verifyToken.userId;
    if (idFromParam != idFromToken)
     return res.status(403).send({ msg: "user is not authorised" });

}
module.exports.checkToken=checkToken