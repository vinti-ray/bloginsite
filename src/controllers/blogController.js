const mongoose = require("mongoose");
const blogModel=require('../Models/BlogsModel')
const ObjectId=mongoose.Types.ObjectId


//Get data based on given querry params
const getBlogData = async function(req,res){ 
    try{
    const data2=req.query
    console.log(data2)
    const reqatt=Object.keys(data2) 
    
    if(reqatt.includes('authorId') || reqatt.includes('category') || reqatt.includes('tags') || reqatt.includes('subcatagory') || reqatt.includes('ispublished')){     
        const ab=await blogModel.find({isDeleted:false})
        if(reqatt.includes('tags')){
            ab.forEach((x)=>{
                if(x['tags']==data2['tags']){
                    data2['tags']=x
                }
            })
        }
        if(reqatt.includes('subcategory')){
            ab.forEach((x)=>{
                if(x['subcategory']==data2['subcategory']){
                    data2['subcategory']=x
                }
            })

        }
        console.log(data2['subcategory'])
        let abb=await blogModel.find(data2,{isDeleted:false},{isPublished:true})
            if(abb.length>0){
                res.status(200).send({data:abb})
            }else{
                res.status(404).send({error:'filtered data doesnt exist'})
            }
        }
    }
    catch(err){
        res.status(404).send({error:err.message})

    }
}
module.exports.getBlogData = getBlogData;

