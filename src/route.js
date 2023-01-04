const express = require('express');   
const router = express.Router(); 
const authorController= require("./controllers/authorController")  
const blogController=require("./controllers/blogController") 
const middleWare=require("./middlewares/commonMiddleware")   
const authMidd=require("./middlewares/auth") 

router.post("/authors", authorController.creaData)

router.put("/delete/:blogId",authMidd.checkToken,authMidd.authorizeUser,blogController.deleteUsingParams)

router.post("/createBlog",authMidd.checkToken,blogController.createBlog)
 
router.put("/deleteByQuery",authMidd.checkToken,authMidd.authorizeUser,blogController.deleteByquery) 


router.post("/login",authorController.login)
  

router.get("/getBlog",authMidd.checkToken,blogController.getBlog)


router.put("/putData/:blogId",authMidd.checkToken,authMidd.authorizeUser,blogController.putData)

module.exports = router;      