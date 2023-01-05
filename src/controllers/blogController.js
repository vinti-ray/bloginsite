const mongoose = require("mongoose");
const blogModel=require('../Models/BlogsModel')
const ObjectId=mongoose.Types.ObjectId
const jwt=require('jsonwebtoken');
const AuthorModel = require("../Models/AuthorModel");
const BlogsModel = require("../Models/BlogsModel");

//Get data based on given querry params
const getBlogData = 
async function (req, res) {

    try {
        let query = req.query["authorId"];
        let filter=req.query
        console.log(req.query)
        //let filter={isDeleted:false,isPublished:true}
        let blogs=await BlogsModel.find({...filter})
        if(blogs.length>0){
          let count=0
          let arr=[]
          blogs.forEach((x)=>{
            if(x["isDeleted"]==false && x["isPublished"]==true){
              //console.log(x)
              arr.push(x)
              count++
              //res.send("success")
              
            }
          })
          if(count==0){
            res.send({status:false})
          }else{
            res.send({status:true,data:arr})
          }
        }
      else{
        res.status(400).send("false")
      }
    }
      catch(err){
        res.send({staus:false,error:err.message})
      }
    
}
          
          
        
        



//--end------


// async function(req,res){ 
//     try{
//     const data2=req.query
//     console.log(data2)
//     const reqatt=Object.keys(data2) 
    
//     if(reqatt.includes('authorId') || reqatt.includes('category') || reqatt.includes('tags') || reqatt.includes('subcatagory') || reqatt.includes('ispublished')){     
//         const ab=await blogModel.find({isDeleted:false})
//         if(reqatt.includes('tags')){
//             ab.forEach((x)=>{
//                 if(x['tags']==data2['tags']){
//                     console.log(x['tags'])
//                     data2['tags']=x
//                 }
//             })
//         }
//         if(reqatt.includes('subcategory')){
//             ab.forEach((x)=>{
//                 if(x['subcategory']==data2['subcategory']){
//                     data2['subcategory']=x
//                 }
//             })

//         }



//         console.log(data2['subcategory'])
//         let abb=await blogModel.find(data2,{isDeleted:false},{isPublished:true})
//             if(abb.length>0){
//                 res.status(200).send({data:abb})
//             }else{
//                 res.status(404).send({error:'filtered data doesnt exist'})
//             }
//         }
//     }
//     catch(err){
//         res.status(404).send({error:err.message})

//     }
// }

//---------------login----------------------

const login=async function(req,res){
    let data=req.body
    if(data){
    let a=await AuthorModel.findOne(data)
    if(a){
        let token=jwt.sign({userId:a["_id"]},"functionup-Project1")
        res.header("x-api-key",token)
        res.status(200).send({status:true})
    }else{
        res.status(401).send({status:false,data:"invalid user"})

    }
}
else{
    res.status(400).send({status:false,msg:'enter data'})
}
}



module.exports.login = login

module.exports.getBlogData = getBlogData;

