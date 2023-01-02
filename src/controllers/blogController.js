const AuthorModel = require("../Models/AuthorModel");
const blogModel = require("../Models/BlogsModel");
var mongoose = require("mongoose");

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
module.exports.createBlog = createBlog;

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
// If the blog document doesn't exist then return an HTTP status of 404 with a body like this
const deleteByquery = async function (req, res) {
  let data = req.query;
  console.log(data);
  if (Object.keys(data) == data._id) {
    let isValid = mongoose.Types.ObjectId.isValid(data._id);

    if (!isValid) return res.send({ msg: "objectId is not valid" });
  }

  if (Object.keys(data) == "isPublished") {
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
module.exports.deleteUsingParams = deleteData;
module.exports.deleteByquery = deleteByquery;
