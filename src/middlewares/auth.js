const blogModel = require("../Models/BlogsModel");
const mongoose = require("mongoose");
const validator=require("../middlewares/commonMiddleware")

//_____________________________for Authentication________________________________
let jwt = require("jsonwebtoken");
const checkToken = function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    if (!token) token = req.headers["x-api-Key"];
    if (!token) return res.send({ msg: "request is missing mandatory header" });

    let verifyToken = jwt.verify(token, "new_seceret_key", (err) => {
      if (err) res.send({ msg: "invalid token" });
    });

    next();
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

//___________________________for Authorisation_________________________________

// category, authorid, tag name, subcategory name, unpublished

const authorizeUser = async function (req, res, next) {
try {
	  let data = req.params //blogId
	
	  let dataTwo = req.query;
	 
	  let filter = {
	    ...data,
	    ...dataTwo, 
	  };
	
	  if (Object.keys(filter).includes("blogId")) { 
	    filter['_id'] = filter['blogId'];
	    delete filter['blogId'] 
	    if(!validator.isValidObjectId(filter._id))  return res.send({ msg: "blogId is not valid" });
	  }
	 
	  console.log(filter); 
	
	
	  const finddata = await blogModel.findOne(filter); 
	
	 console.log(finddata)
	 
	 if(!finddata ) return res.status(400).send({msg:"no user found from mw"})
	
	  let token = req.headers["x-api-key"];
	 
	  let decodeToken = jwt.verify(token, "new_seceret_key");
      
	  let idOne = finddata.authorId.toString();
	
	  console.log(idOne);
	  console.log(decodeToken.id);
	  if (decodeToken.id != idOne) {
	    return res.send({ msg: "you are not authorised" });
	  } else {
	    next();
	  }
} catch (error) {
	res.status(500).send({ msg: error.message });
}
};
module.exports.checkToken = checkToken;
module.exports.authorizeUser = authorizeUser;

//Make sure that only the owner of the blogs is able to edit or delete the blog.
// In case of unauthorized access return an appropirate error message.
// Testing (Self-evaluation During Development)
// To test these apis create a new collection in Postman named Project 1 Blogging
// Each api should have a new request in this collection
// Each request in the collection should be rightly named. Eg Create author, Create blog, Get blogs etc
// Each member of each team should have their tests in running state
// Refer below sample
