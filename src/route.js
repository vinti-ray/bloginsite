const express = require('express'); 
const router = express.Router();
const authorController= require("./controllers/authorController")
const blogController=require("./controllers/blogController")
const middleWare=require("./middlewares/commonMiddleware")

router.post("/authors",middleWare.validateEmail, authorController.creaData)

router.put("/delete/:blogId",blogController.deleteUsingParams)
router.post("/createBlog",blogController.createBlog)
router.get("/deleteByQuery",blogController.deleteByquery)

module.exports = router;     