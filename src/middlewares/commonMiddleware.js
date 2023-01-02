const validateEmail = function(req,res,next) {
    let email=req.body.email
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(! regex.test(email)) {  res.send({msg:"enter valid email"});
}else{
    next()
}
};
module.exports.validateEmail=validateEmail