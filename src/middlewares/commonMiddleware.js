const validateEmail = function(req,res,next) {
    let email=req.body.email
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(! regex.test(email))  return  res.send({msg:"enter valid email"});

    let password =req.body.password
    const passwordRegex=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if(!passwordRegex.test(password))   return res.send({msg:"password must contain Minimum eight characters, at least one letter, one number and one special character"})


    next()

};




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
module.exports.validateEmail=validateEmail
module.exports.checkToken=checkToken