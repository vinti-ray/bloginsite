const blogModel=require('../Models/BlogsModel')
const authorModel=require('../Models/AuthorModel')
const mW=require('../middlewares/commonMiddleware')
const mongoose=require('mongoose');
const ObjectId=mongoose.Types.ObjectId
const e = require("express");
const { findOneAndUpdate } = require('../Models/BlogsModel');


//create author with valid details
const createAuthor=async function(req,res){
    try{
        let data=req.body
        if(data){
           
            if(mW.isValidName(data['fname']))
            {
                if(mW.isValidName(data['lname']))
                {
                    if(mW.isValidPassword(data['password']))
                    {
                        let authors=await authorModel.create(data)
                        res.status(201).send({msg:authors})
                    }else{
                        res.status(401).send({msg:'invalid password'})
                    }
                }else{
                        res.status(401).send({msg:'invalid lastname'})
                    }}else{
                        res.status(401).send({msg:'invalid first name'})
                    }
                    
                }
        else{
            res.status(404).send({msg:"enter data"})
        }
    
    }
    catch(err){
        res.status(400).send({status:false,msg:err.message})
    }
}

//create a blog if authorId is valid
const createBook=async function(req,res){
    try{
    let data1=req.body
    let data2=data1['authorId']

    console.log(data2)
        let book=await authorModel.findOne({_id:data2})
        if(book!=null){
            //data1['isPublished']=true
            let books=await blogModel.create(data1)
            res.status(201).send({status:true,msg:books})

        }else{
            res.status(404).send({status:false,error:'Invalid authorId'})
        }
    }
catch(err){
    res.status(500).send({error:err.message})

}
 
}


//update blog data for given blogId in path params
const updateData=async function(req,res){
    try{
        const data2=req.params
        console.log(data2)
        let id=data2['blogId']
        let abc=await blogModel.findOne({"_id":{$eq:id}})
        //return res.send({msg:abc})
        if(abc!=null){
            let adc=req.body
            let p=Object.keys(adc)
            if(p.includes('tags') || p.includes('subcategory')){
                console.log(adc['tags'])
                let gh=adc["tags"]
                let q=await blogModel.findOneAndUpdate({"_id":id},{$push:{tags:gh},isPublished:true,publishedAt:Date.now()},{new:true})
            return res.status(201).send({msg:q})
            }if(p.includes('body')){
                let gh=adc["body"]
                let q=await blogModel.findOneAndUpdate({"_id":{$eq:id}},{body:gh,isPublished:true,publishedAt:Date.now()},{new:true})
            return res.status(201).send({msg:q})

            }if(p.includes('title')){
                let gh=adc["title"]
                let q=await blogModel.findOneAndUpdate({"_id":{$eq:id}},{title:gh,isPublished:true,publishedAt:Date.now()},{new:true})
            return res.status(201).send({msg:q})
            }if(p.includes('category')){
                let gh=adc["category"]
                let q=await blogModel.findOneAndUpdate({"_id":{$eq:id}},{title:gh,isPublished:true,publishedAt:Date.now()},{new:true})
            return res.status(201).send({msg:q})
            }else{
                //let q=await blogModel.findOneAndUpdate({"_id":{$eq:id}},{isPublished:true,publishedAt:Date.now()},{new:true})
            return res.status(400).send({msg:'enter valid attribute'})
            }
        }else{
            res.status(403).send({msg:'Authentication Fali'})
        }
    }
    
catch(err){
    res.status(400).send({error:err.message})
}
    
}


// const updateData=async function(req,res){
//     let id = req.params.blogId;
//     let isValid = mongoose.Types.ObjectId.isValid(id);
  
//     if (!isValid) return res.status(403).send({ msg: "objectId is not valid" });
//     if (!id) return res.status(404).send({ msg: "blogId is missing" });
    
//     const findDataFromId = await blogModel.findOne({_id:id,isDeleted:false});
//     if (!findDataFromId) res.send({ msg: "no data found" });
//      let toUpdateData=req.body
//      if(Object.keys(toUpdateData).length==0)  return res.status(400).send({msg:"body is missing"})
  
//      if(Object.keys(toUpdateData).includes('title')){
//      const updateData=await blogModel.findOneAndUpdate({_id:id},{$set:{title:toUpdateData.title,}},{new:true})
//      res.send({msg:updateData})
//      }
//      if(Object.keys(toUpdateData).includes('body')){
//       const updateData=await blogModel.findOneAndUpdate({_id:id},{$set:{body:toUpdateData.body}},{new:true}) 
//       res.send({msg:updateData})
//       }
  
//       if(Object.keys(toUpdateData).includes('tags')){
//         const updateData=await blogModel.findOneAndUpdate({_id:id},{$push:{tags:toUpdateData.tags}},{new:true})
//         res.send({msg:updateData})
//         }
//         if(Object.keys(toUpdateData).includes('subcategory')){
//           const updateData=await blogModel.findOneAndUpdate({_id:id},{$push:{subcategory:toUpdateData.subcategory}},{new:true})
//           res.send({msg:updateData})
//           }
//   }











//Delete blogs with blog id in path params

const deleteData=async function(req,res){ 
    try{
    const data2=req.params
        console.log(data2)
        let id=data2['blogId']
        let abc=await blogModel.findOne({"_id":{$eq:id},isDeleted:false})
      if(abc!=null){
        let bpq=await blogModel.findOneAndUpdate({"_id":{$eq:id},isDeleted:false},{isDeleted:true},{new:true})
        res.status(203).send({msg:bpq})
    }else{
        res.status(404).send('data not found')
    }
        
        
        res.send({msg:abc})
}

catch(err){
    return res.status(403).send({error:err.message})
}
}

// Delete blog documents by category, authorid, tag name, subcategory name, unpublished
const deleteTwo=async function(req,res){ 
        try{
        const data2=req.query
        console.log(data2)
        const reqatt=Object.keys(data2)        
        if(reqatt.includes('authorId') || reqatt.includes('category') || reqatt.includes('tags') || reqatt.includes('subcatagory') || reqatt.includes('ispublished')){
            const ab=await blogModel.find(data2)
                if(ab.length>0){
                   const result=await blogModel.updateMany(data2,{isDeleted:true},{new:true})
                res.status(200).send({data:result})

                }else{
                    res.status(404).send({msg:'document not found'})
                }
            }
        }
catch(err){
    res.send(err.message)

}
}
module.exports.deleteData=deleteData
module.exports.deleteTwo=deleteTwo
module.exports.createAuthor=createAuthor
module.exports.createBook=createBook
module.exports.updateData=updateData