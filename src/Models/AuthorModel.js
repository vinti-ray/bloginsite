const validateEmail = function(email) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
};

const mongoose=require('mongoose')
const AuthSchema=new mongoose.Schema({
    fname: { type:String,required:true},
     lname: {type:String,required:true}, 
     title: {required:true, enum:['Mr', 'Mrs', 'Miss']}, 
     email: {type: String,
        validate: [validateEmail, "Please enter a valid email"], 
        unique:true
    }, 
password: {type:String,required:true} 
})

module.exports=mongoose.model('Project1Author',AuthSchema)