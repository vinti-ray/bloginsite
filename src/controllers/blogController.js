const mongoose = require("mongoose");
const getBlogData = async function (req, res) {
    const authorId = req.query.authorId;
    const category = req.query.category;
    const tags = req.query.tags;
    try {
        if (!authorId || !category || !tags) {
            return res.status(400).send({ error: "No data passed" });
        }
        else {
            if (authorId) authorId = await blogModel.findOne().populate('authorId');
            const getData = await blogModel.find({$or: [{ authorId: authorId },{ category: category },{ tags: tags }]});
            
            if (Object.keys(getData).length == 0) return res.status(404).send({ error: "Blog data doesn't exists" });

            res.status(200).send({ gettingData: getData })
        }
    }
    catch (error) {
        res.status(500).send({ error: error.message })
    }

}
module.exports.getBlogData = getBlogData;

