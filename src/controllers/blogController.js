const mongoose = require("mongoose");
const blogModel=require('../Models/BlogsModel')
const ObjectId=mongoose.Types.ObjectId


//Get data based on given querry params
const getBlogData = 


//---start---
async function (req, res) {
  try{
        let data = req.query; 
        console.log(data); 
        let filter={
          isDeleted:false,
          isPublished:true,
          ...data 
        }
        console.log(filter)
      
        if (Object.keys(data).includes('authorId')) {
          let isValid = mongoose.Types.ObjectId.isValid(data.authorId);
      
          if (!isValid) return res.send({ msg: "authorId is not valid" });
        }
      
       
        const finddata = await blogModel.find(filter);
        if (Object.keys(finddata).length==0) return res.send({ msg: "no user found" });
      
        res.send({ msg: finddata })
    
    }
    catch(err){
        res.status(404).send({status:false,error:err.message})
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
module.exports.getBlogData = getBlogData;

