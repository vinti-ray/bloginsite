const authorModel = require("../Models/AuthorModel");
 
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


module.exports.creaData = creaData;









