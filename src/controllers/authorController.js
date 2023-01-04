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
                        res.status(201).send({status:true,"data":authors})
                    }else{
                        res.status(401).send({status:false,"data":'invalid password'})
                    }
                }else{
                        res.status(401).send({status:false,"data":'invalid lastname'})
                    }}else{
                        res.status(401).send({status:false,"data":'invalid first name'})
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
    let data2=ObjectId(data1['authorId'])

    console.log(data2)
        let book=await authorModel.findOne({_id:data2})
        
        if(book!=null){
            //data1['isPublished']=true
            let books=await blogModel.create(data1)
            res.status(201).send({status:true,"data":books})

        }else{
            res.status(404).send({status:false,error:'Invalid authorId'})
        }
    }
catch(err){
    res.status(400).send({error:err.message})

}
 
}


//update blog data for given blogId in path params
const updateData=async function(req,res){
    try{
        const data2=req.params
        console.log(data2)
        let id=ObjectId(data2['blogId'])
        let abc=await blogModel.findOne({"_id":{$eq:id},isDeleted:false})
        //return res.send({msg:abc})
        if(abc!=null){
            let adc=req.body
            let p=Object.keys(adc)
            if(p.includes('tags') || p.includes('subcategory')){
                console.log(adc['tags'])
                let gh=adc["tags"]
                let sh=adc["subcategory"]
                let q=await blogModel.findOneAndUpdate({"_id":id},{$push:{tags:gh,subcategory:sh},isPublished:true,publishedAt:Date.now()},{new:true})
            return res.status(200).send({status:true,data:q})
            }if(p.includes('body')){
                let gh=adc["body"]
                let q=await blogModel.findOneAndUpdate({"_id":{$eq:id}},{body:gh,isPublished:true,publishedAt:Date.now()},{new:true})
            return res.status(200).send({status:true,"data":q})

            }if(p.includes('title')){
                let gh=adc["title"]
                let q=await blogModel.findOneAndUpdate({"_id":{$eq:id}},{title:gh,isPublished:true,publishedAt:Date.now()},{new:true})
            return res.status(200).send({status:true,"data":q})
            }if(p.includes('category')){
                let gh=adc["category"]
                let q=await blogModel.findOneAndUpdate({"_id":{$eq:id}},{category:gh,isPublished:true,publishedAt:Date.now()},{new:true})
            return res.status(200).send({status:true,"data":q})
            

            }else{
                //let q=await blogModel.findOneAndUpdate({"_id":{$eq:id}},{isPublished:true,publishedAt:Date.now()},{new:true})
            return res.status(400).send({status:false,msg:'enter valid attribute'})
            }
        }else{
            res.status(403).send({status:false,msg:'Authentication Fali'})
        }
    }
    
catch(err){
    res.status(400).send({status:false,error:err.message})
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






//------------------------nikithas------------------------------->

//------------------nikithas end----------------------------------->

//Delete blogs with blog id in path params

const deleteData=async function(req,res){ 
    try{
    const data2=req.params
        console.log(data2)
        let id=ObjectId(data2['blogId'])
        let abc=await blogModel.findOne({"_id":{$eq:id},isDeleted:false})
      if(abc!=null){
        let bpq=await blogModel.findOneAndUpdate({"_id":{$eq:id},isDeleted:false},{isDeleted:true},{new:true})
        res.status(200).send({status:true})
    }else{
        res.status(404).send({status:false,msg:'data not found'})
    }
        
        
        res.send({msg:abc})
}

catch(err){
    return res.status(403).send({status:false,error:err.message})
}
}

// Delete blog documents by category, authorid, tag name, subcategory name, unpublished
const deleteTwo=async function(req,res){ 
        try{
        const data2=req.query
    if(data2){
       // console.log(data2)
        const reqatt=Object.keys(data2)  
        let arr=['authorId','category','tags','subcatagory','isPublished'] 
        let count1=0
        let count2=0  
        for(let i=0;i<reqatt.length;i++){
            if(arr.includes(reqatt[i])){
                count1++
                console.log(reqatt[i],reqatt.length)
        }
    }
        if(count1!=reqatt.length){
            console.log(count1)
            res.status(400).send({status:false,msg:'invalid attributes'})
        }else{
            if(reqatt.includes('isPublished')){
                if(data2['isPublished']=='false'){
                    data2['isPublished']=false
                }else{
                    return res.status(400).send({status:false,data:'invalid value'})
                }

            }
            const ab=await blogModel.find({isDeleted:false})
            if(ab.length>0){
            if(reqatt.includes('subcategory')){
                ab.forEach((x)=>{
                  let p= x['subcategory']
                  p.forEach((y)=>{
                    if(y==data2['subcategory']){
                        data2['subcategory']=p
                    }
                  })
                
                })
            }
            if(reqatt.includes('tags')){
                ab.forEach((x)=>{
                  let p= x['tags']
                  p.forEach((y)=>{
                    if(y==data2['tags']){
                        data2['tags']=p
                    }
                  })
                
                })
            }
        }else{
            res.status(404).send({status:false,msg:'document not found'})
        }
    
const result=await blogModel.updateMany(data2,{isDeleted:true,deletedAt:Date.now()},{new:true})
                res.status(200).send({status:true,data:result})
        }
    
    }else{
                    res.status(404).send({status:false,msg:'document not found'})
                }
            }
        
catch(err){
    res.status(400).send({status:false,error:err.message})

}
}

module.exports.deleteData=deleteData
module.exports.deleteTwo=deleteTwo
module.exports.createAuthor=createAuthor
module.exports.createBook=createBook
module.exports.updateData=updateData
