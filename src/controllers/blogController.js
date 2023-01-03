const AuthorModel = require("../Models/AuthorModel");
const blogModel = require("../Models/BlogsModel");
var mongoose = require("mongoose");
//___________createBlog___________
const createBlog = async function (req, res) {
  let data = req.body;
  if (!data.title) return res.status(404).send({ msg: "title in mandatory" });

  if (!data.body) return res.status(404).send({ msg: "body in mandatory" });

  if (!data.category)
    return res.status(404).send({ msg: "category in mandatory" });

  if (!data.category)
    return res.status(404).send({ msg: "category in mandatory" });

  let isValid = mongoose.Types.ObjectId.isValid(data.authorId);

  if (!isValid) return res.send({ msg: "objectId is not valid" });

  const isauthorIdpresent = await AuthorModel.findById(data.authorId);

  if (!isauthorIdpresent) return res.send({ msg: "no author found " });

  const createData = await blogModel.create(data);
  res.send({ msg: createData });
};


//__________getApi______________//
// Returns all blogs in the collection that aren't deleted and are published
// Return the HTTP status 200 if any documents are found. The response structure should be like this
// If no documents are found then return an HTTP status 404 with a response like this
// Filter blogs list by applying filters. Query param can have any combination of below filters.
// By author Id
// By category
// List of blogs that have a specific tag
// List of blogs that have a specific subcategory example of a query url: blogs?filtername=filtervalue&f2=fv2
const getBlog = async function (req, res) {

    let data = req.query; 
    console.log(data); 
    let filter={
      isDeleted:false,
      isPublished:true,
      ...data
    }
  
    if (Object.keys(data).includes('authorId')) {
      let isValid = mongoose.Types.ObjectId.isValid(data.authorId);
  
      if (!isValid) return res.send({ msg: "authorId is not valid" });
    }
  
   
    const finddata = await blogModel.find(filter);
    if (Object.keys(finddata).length==0) return res.send({ msg: "no user found" });
  
    res.send({ msg: finddata })

}



//_______postBlog_______________//
//PUT /blogs/:blogId
// Updates a blog by changing the its title, body, adding tags, adding a subcategory. (Assuming tag and subcategory received in body is need to be added)
// Updates a blog by changing its publish status i.e. adds publishedAt date and set published to true
// Check if the blogId exists (must have isDeleted false). If it doesn't, return an HTTP status 404 with a response body like this
// Return an HTTP status 200 if updated successfully with a body like this
// Also make sure in the response you return the updated blog document.
const putData=async function(req,res){
  let id = req.params.blogId;
  let isValid = mongoose.Types.ObjectId.isValid(id);
  
  if (!isValid) return res.send({ msg: "objectId is not valid" });
  if (!id) return res.status(404).send({ msg: "blogId is missing" });
  
  const findDataFromId = await blogModel.findOne({_id:id,isDeleted:false});

  if (!findDataFromId) res.send({ msg: "no data found" });
   let toUpdateData=req.body
   if(Object.keys(toUpdateData).length==0)  return res.send({msg:"body is missing"})

   if(Object.keys(toUpdateData).includes('title')){
   const updateData=await blogModel.findOneAndUpdate({_id:id},{$set:{title:toUpdateData.title},isPublished:true,publishedAt:Date.now()},{new:true})
   res.send({msg:updateData})
   }
   if(Object.keys(toUpdateData).includes('body')){
    const updateData=await blogModel.findOneAndUpdate({_id:id},{$set:{body:toUpdateData.body},isPublished:true,publishedAt:Date.now()},{new:true}) 
    res.send({msg:updateData})
    }
 
   if(Object.keys(toUpdateData).includes('tags')){
      const updateData=await blogModel.findOneAndUpdate({_id:id},{$push:{tags:toUpdateData.tags},isPublished:true,publishedAt:Date.now()},{new:true})
      res.send({msg:updateData})
      }
      if(Object.keys(toUpdateData).includes('subcategory')){
        const updateData=await blogModel.findOneAndUpdate({_id:id},{$push:{subcategory:toUpdateData.subcategory},isPublished:true,publishedAt:Date.now()},{new:true})
        res.send({msg:updateData})
        }
}

//_____________deleteBlogs______________//

//Check if the blogId exists( and is not deleted). If it does, mark it deleted and return an HTTP status 200 without any response body.
// If the blog document doesn't exist then return an HTTP status of 404 with a body like this
const deleteData = async function (req, res) {
  let id = req.params.blogId;
  let isValid = mongoose.Types.ObjectId.isValid(id);

  if (!isValid) return res.send({ msg: "objectId is not valid" });
  if (!id) return res.status(404).send({ msg: "blogId is missing" });
  
  const findDataFromId = await blogModel.findById(id);
  if (!findDataFromId) res.send({ msg: "no data found" });

  if (findDataFromId.isDeleted == false) {
    const updateWithDeleted = await blogModel.findOneAndUpdate(
      id,
      { $set: { isDeleted: true, DeletedAt: Date.now() } },
      { new: true }
    );
    return res.send({ updateWithDeleted });
  } else {
    res.send({ msg: "blog is already deleted" });
  }
};

//Delete blog documents by category, authorid, tag name, subcategory name, unpublished
//
// If the blog document doesn't exist then return an HTTP status of 404 with a body like this
const deleteByquery = async function (req, res) {
  let data = req.query; 
  console.log(data);

  if (Object.keys(data).includes('_id')) {
    let isValid = mongoose.Types.ObjectId.isValid(data._id);

    if (!isValid) return res.send({ msg: "objectId is not valid" });
  }
   

  if (Object.keys(data).includes ("isPublished")) { 
    if (data.isPublished != "false" && data.isPublished != "true") 
      return res.send({ msg: "require boolean here" });
  }


  const finddata = await blogModel.findOne(data);
  if (!finddata) return res.send({ msg: "no user found" });
  if (finddata.isDeleted == false) {
    const updateData = await blogModel.updateMany(data, {
      $set: { isDeleted: true, DeletedAt: Date.now() },
    });
    res.send({ msg: updateData });
  } else {
    res.send({ msg: "blog is already deleted" });
  }
};

module.exports.createBlog = createBlog;
module.exports.getBlog=getBlog
module.exports.deleteUsingParams = deleteData;
module.exports.deleteByquery = deleteByquery;
module.exports.putData=putData

