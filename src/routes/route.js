
const express = require('express');
const blogController=require('../controllers/blogController')
const router = express.Router();
const authorModel=require('../Models/AuthorModel')
const blogModel=require('../Models/BlogsModel')
const authController=require('../Controllers/authorController')
const middleWare=require('../middlewares/commonMiddleware');
const authMid=require('../middlewares/authorization')
const { find } = require('../Models/BlogsModel');
const  auth1Mid=require("../middlewares/authentication")


//----------routes------------------------------------

router.post('/authors', authController.createAuthor)
router.post('/blogs',auth1Mid.mid1,authMid.autherization,authController.createBook)
router.get('/blogs', auth1Mid.mid1,authMid.autherization, blogController.getBlogData)
router.post('/login',authController.login)
router.put("/blogs/:blogId",auth1Mid.mid1,authMid.autherization,authController.updateData)

router.delete("/blogs",auth1Mid.mid1,authMid.autherization,authController.deleteTwo)

// router.get('/practice',middleWare.mid1,authMid.autherization,async function(req,res){
//     let s=await blogModel.find({isDeleted:false}).count()
//     res.send({msg:s})
// })

router.delete("/blogs/:blogId",auth1Mid.mid1,authMid.autherization,authController.deleteData)

router.all('/*',function(req,res){
    res.status(400).send({msg:"invalid request"})
})
module.exports=router