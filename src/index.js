const express= require("express")
const bodyParser=require("body-parser")
const app =express(); 
const mongoose=require('mongoose')
const route=require("./route")


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://vintiray:7091201680@cluster0.ahtxrqr.mongodb.net/test", {
    useNewUrlParser: true
})

.then( () => console.log("MongoDb is connected")) 
.catch ( err => console.log(err) )

app.use('/',route)

 


app.listen(3000 , function(){
    console.log('Express app running on port ' +(3000))
}
)
