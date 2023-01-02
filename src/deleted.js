// DELETE /blogs/:blogId
// Check if the blogId exists( and is not deleted). If it does, mark it deleted and return an HTTP status 200 without any response body.
// If the blog document doesn't exist then return an HTTP status of 404 with a body like this
// DELETE /blogs?queryParams
// Delete blog documents by category, authorid, tag name, subcategory name, unpublished
// If the blog document doesn't exist then return an HTTP status of 404 with a body like this


// let data=req.params.blogId
// let blog=async function(req,res){
//     let findData=await blogModel.findOne({_id:data,deleted:false})
//     if(ObjectKeys(findData).length!=0)
// }
