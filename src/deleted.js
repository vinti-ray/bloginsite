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




// const deleteData=async function(req,res){ 
//     let id=req.params.blogId
//     let blogWithId=await blogModel.findOne({_id:id,isDeleted:false})
//     if(!blogWithId) return res.status(404).send({status:false,msg:""})
 
//     let updateBlog=await blogModel.findByIdAndUpdate(id,{$set:{isDeleted:true}})
//     res.status(203)
// }


// // Delete blog documents by category, authorid, tag name, subcategory name, unpublished
// const deleteTwo=async function(req,res){ 

//          const authorId = req.query['_id'];
//          console.log(authorId)
//         const category = req.query['category'];
//         const tags = req.query['tags']; 
//         const subcatagory=req.query['subcatagory' ]
//         const unpublished=req.query['unpublished']



//         const findData=await blogModel.findOne({$or: [{ _id: authorId },{ category: category },{ tags: tags },{subcategory:subcatagory},{unpublished:unpublished}]})
//         if(!findData)  return  res.status(404).send({status:false,msg:""})
//         console.log(findData)

//             const getData = await blogModel.findOneAndUpdate({$or: [{ _id: authorId },{ category: category },{ tags: tags },{subcategory:subcatagory},{unpublished:unpublished}]},{$set:{isDeleted:true}});
    
//     // const findData=await blogModel.findOne({data})
//     // if(!findData){
//     //     res.status(404).send({status:false,msg:""}) 
//     // }else{
//     //  console.log(findData)
//     // const deleteData=await blogModel.findOneAndUpdate(data,{$unset:{isDeleted:true}},{new:true})
//     res.status(200).send(getData)
//     // }
// }







// module.exports.deleteData=deleteData
// module.exports.deleteTwo=deleteTwo