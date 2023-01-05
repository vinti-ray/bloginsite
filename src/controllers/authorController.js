const blogModel=require('../Models/BlogsModel')
const authorModel=require('../Models/AuthorModel')
const mW=require('../middlewares/commonMiddleware')
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const ObjectId=mongoose.Types.ObjectId
const e = require("express");
const { findOneAndUpdate } = require('../Models/BlogsModel');


//-------------------------------------------login-----------------------------------------

const login=async function(req,res){
    let data=req.body
    if(data){
    let a=await authorModel.findOne(data)
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

//------------------------------END---------------------------------------------------------------

//------------------------------------create author with valid details-----------------------
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
//----------------------------------------END------------------------------------------------



//------------------------------------------create a blog if authorId is valid----------------------------------------
const createBlog=async function(req,res){
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
//---------------------------------END-------------------------------------------------


//----------------------------update blog data for given blogId in path params-------------------------------------
const updateData=async function(req,res){
    try{
        
        const data2=req.params
        //console.log(data2)
        let id=data2['blogId']
        let abc=await blogModel.findOne({"_id":{$eq:id},isDeleted:false})
        //return res.send({msg:abc})
        console.log(id)
        console.log(abc)
        if(abc!=null ){
            if(abc["authorId"]==req.body["authorId"]){
            let adc=req.body
            let p=Object.keys(adc)
            if(p.includes('tags') || p.includes('subcategory')){
                //console.log(adc['tags'])
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
            return res.status(400).send({status:false,msg:'enter valid attributes to modify data'})
            }
        }else{
            res.status(403).send({status:false,msg:'enter valid authorId'})
        }
        }else{
            res.status(404).send({status:false,msg:"no documents found"})
        }
    }
    
catch(err){
    res.status(400).send({status:false,error:err.message})
}
    
}

//----------------------------update END-----------------------------------------------











//----------------------------------Delete blogs with blog id in path params----------------------------------------------

const deleteData=async function(req,res){ 
    try{
    const data2=req.params
        //console.log(data2)
        if(data2){
        let id=ObjectId(data2['blogId'])
        let abc=await blogModel.findOne({"_id":{$eq:id},isDeleted:false})
      if(abc!=null){
        if(abc["authorId"]==req.body["authorId"]){
        let bpq=await blogModel.findOneAndUpdate({"_id":{$eq:id},isDeleted:false},{isDeleted:true,DeletedAt:Date.now()},{new:true})
        res.status(200).send({status:true})
        }else{
            res.status(403).send({status:false,msg:'you are not authorized'})
        }
    }else{
        res.status(404).send({status:false,msg:'data not found'})
    }
}else{
    res.status(400).send({status:false,msg:'blog id is required'})
}
        
        res.send({msg:abc})
}

catch(err){
    return res.status(403).send({status:false,error:err.message})
}
}
 //--------------------------------------------------END--------------------------------------------------------



/// -------------------------------------------------------Delete blog documents by category, authorid, tag name, subcategory name, unpublished
const deleteTwo=async function(req,res){ 
        try{
        let data2=req.query
//checkingdata if user entered some data or not
    if(data2){
      
        const reqatt=Object.keys(data2)  
        let arr=['authorId','category','tags','subcatagory','isPublished'] 
        let count1=0
        //let count2=0  
//checking if attribute is from the list mentioned in array or not
        for(let i=0;i<reqatt.length;i++){
            if(arr.includes(reqatt[i])){
                count1++
                console.log(reqatt[i],reqatt.length)
        }
    }
//if not avalid attribute terminating cycle here its self
        if(count1!=reqatt.length){
            console.log(count1)
            res.status(400).send({status:false,msg:'invalid attributes'})
        
        
        }
//if present and if querry includes isPublished then converet that into boolean and that to it should be false(unpublished)
        else{
            if(reqatt.includes('isPublished')){
                if(data2['isPublished']=='false'){
                    data2['isPublished']=false
                }
//if value associated with isPublished is not false then no second look terminate as we can only teminate unpublished categ
                else{
                    return res.status(400).send({status:false,data:'invalid value'})
                }

            }

//If cycle is running then im making a db call and geeting documents which are not deleted
const ab=await blogModel.find({isDeleted:{$eq:false},DeletedAt:{$exists:false}})
            console.log(ab)
//with this db call i will get all docs which are not deleted in an array
//If any such document exist length of resultant array should be greater than 0
        if(ab.length>0){
//i got doc but subcategory is an array if user gave only one element we need to take that and delete all docs consisting of that array
            
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
            
//i got doc but tags is an array if user gave only one element we need to take that and delete all docs consisting of that array
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
            const result=await blogModel.updateMany(data2,{$set:{isDeleted:true,DeletedAt:Date.now()}},{new:true})    
                    let count=0
                        if(result){
                            count++

                        }
                    console.log(count)
            res.status(200).send({status:true,data:result})
        }
//If length is not greater than 0 it mean document no document exist we we will end cycle with 404 
        else{
            res.status(404).send({status:false,msg:'sorry document is aready deleted'})
        }
    

        }
    
    }else{
                    res.status(400).send({status:false,msg:' data is reuired'})
                }
        }
        
catch(err){
    res.status(400).send({status:false,error:err.message})

}
}

module.exports.deleteData=deleteData
module.exports.deleteTwo=deleteTwo
module.exports.createAuthor=createAuthor
module.exports.createBook=createBlog
module.exports.updateData=updateData
