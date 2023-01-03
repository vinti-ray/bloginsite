
const express = require('express');
const blogController=require('../controllers/blogController')
const router = express.Router();
const authorModel=require('../Models/AuthorModel')
const blogSchema=require('../Models/BlogsModel')
const authController=require('../Controllers/authorController')
const middleWare=require('../middlewares/commonMiddleware')


router.post('/authors', authController.createAuthor)
router.post('/blogs',authController.createBook)
router.get('/blogs',blogController.getBlogData)
router.put("/blogs/:blogId",authController.updateData)
router.delete("/blogs",authController.deleteTwo)

router.delete("/blogs/:blogId",authController.deleteData)
module.exports=router