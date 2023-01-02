const blogModel=require('../Models/BlogsModel')
const authorModel=require('../Models/AuthorModel')
const mongoose=require('mongoose');
const e = require("express");

const createAuthor=async function(req,res){
    try{
    let data=req.body
    let authors=await authorModel.create(data)
    res.status(201).send({msg:authors})
    }
    catch(err){
        res.status(400).send({status:false,msg:err.message})
    }
}


const createBook=async function(req,res){
    try{
    let data1=req.body
    let data2=data1['authorId']

    console.log(data2)
        let book=await authorModel.find({_id:data2})
        if(book){
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
module.exports.createAuthor=createAuthor
module.exports.createBook=createBook