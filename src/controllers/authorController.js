const authorModel = require("../Models/AuthorModel");
 let jwt=require('jsonwebtoken')
const blogModel = require("../Models/BlogsModel");

const creaData = async function (req, res) {
  let data = req.body;
  if (!data.fname) return res.status(404).send({ msg: "fname is mandatory" });

  if (!data.lname) return res.status(404).send({ msg: "lname in mandatory" }); 

  if (!data.title) {
    return res.status(404).send({ msg: "title in mandatory" });
  } else {
    if (data.title != "Mr" && data.title != "Mrs" && data.title != "Miss")
      return res.status(404).send({ msg: "title can only be Mr ,Mrs or Miss" });
  }

  if (!data.password)
    return res.status(404).send({ msg: "password is mandatory" });

   const isEmailUnique= await authorModel.findOne({email:data.email})
   if(isEmailUnique)   return res.send({msg:"email is already used,please use another email"})
    
  const create = await authorModel.create(data);
  res.send({ msg: create });
};

const getData=async function(req,res){

}


const login=async function(req,res) {
  let email=req.body.email
  let password=req.body.password
  if(!email)  return res.send({msg:"email is required"})
  if(!password)  return res.send({msg:"password is required"})
  const findData=await authorModel.findOne({email:email,password:password})
  if(!findData)  return res.send({msg:"no data found"})
  const createToken=jwt.sign({id:findData,name:findData.fname},"new_seceret_key")
  res.header("token",createToken)
  res.send({msg:createToken})
}

module.exports.creaData = creaData;
module.exports.login=login




	//Returns all blogs in the collection that aren't deleted and are published
	// Return the HTTP status 200 if any documents are found. The response structure should be like this
	// If no documents are found then return an HTTP status 404 with a response like this
	// Filter blogs list by applying filters. Query param can have any combination of below filters.
	// By author Id
	// By category
	// List of blogs that have a specific tag
	// List of blogs that have a specific subcategory example of a query url: blogs?filtername=filtervalue&f2=fv2










