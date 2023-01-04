const validateEmail = function(req,res,next) {
    let email=req.body.email
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(! regex.test(email))  return  res.send({msg:"enter valid email"});

    let password =req.body.password
    const passwordRegex=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if(!passwordRegex.test(password))   return res.send({msg:"password must contain Minimum eight characters, at least one letter, one number and one special character"})


    next()

};





module.exports.validateEmail=validateEmail
