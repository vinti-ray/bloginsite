const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const mongoose=require('mongoose')
const AuthSchema=new mongoose.Schema({
    fname: { 
        type:String,
        required:true,
        trim:true
    },
     lname: {
        type:String,
        required:true,
        trim:true
    }, 
     title: {
        type:String,
        required:true, 
        enum:['Mr', 'Mrs', 'Miss'],
        trim:true
    }, 
     email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    

        
    }, 
password: {type:String,required:true,trim:true} 
})

module.exports=mongoose.model('Project1Author',AuthSchema)