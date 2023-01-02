const express= require("express")
const bodyParser=require("body-parser")
const app =express();


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://users-open-to-all:hiPassword123@cluster0.uh35t.mongodb.net/skDB?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/',route)


app.listen(3000 , function(){
    console.log('Express app running on port ' +(3000))
}
)
