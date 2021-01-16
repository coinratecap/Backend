const blogServices = require('../services/blog');
const { v4: uuidv4 } = require('uuid');

exports.addPost = async (req, res) => {
    try {
        let payload = {
            id: uuidv4(),
            title:req.body.title,
            category: req.body.category,
            shortDescription: req.body.shortDescription,
            description: req.body.description,
        }
        let uploadImages = req.files;
        let coverImage = uploadImages.find(({ fieldname }) => fieldname === `coverImage`);
        payload.coverImage = coverImage.path;

        let post = await blogServices.addPost(payload)
        res.status(200).json({
            msg: "Post added",
            status: true,
            data: post
        })
    } catch (err) {
        res.status(400).json({ error: err, status: false })
    }
}

exports.getAllPost = async (req, res) => {
    try {
        let posts = await blogServices.getAllPost();
        res.status(200).json({
            data: posts,
            status: true
        })

    } catch (err) {
        res.status(400).json({ error: err, status: false })
    }
}

exports.getPostDetails = async (req, res) => {
    try {
        let { id } = req.params;
        let post = await blogServices.getPostDetails(id);
        res.status(200).json({
            data: post,
            status: true
        })
    } catch (err) {
        res.status(400).json({ error: err, status: false })
    }
}

exports.deletePost = async (req, res) => {
    try {
        let { id } = req.params
        await blogServices.deletePost(id);
        res.status(200).json({
            msg: "Post Deleted",
            status: true
        })
    } catch (err) {
        res.status(400).json({ error: err, status: false })
    }
}

exports.updatePost = async (req, res) => {
    try {
        let { id } = req.params;
        if(req.file){
            let uploadImages = req.files;
            let coverImage = uploadImages.find(({ fieldname }) => fieldname === `coverImage`);
            req.body.coverImage = coverImage.path;
        }
        let post = await blogServices.updatePost(id,req.body)
        res.status(200).json({
            msg: "Post Updated",
            status: true,
            data: post
        })
    } catch (err) {
        res.status(400).json({ error: err, status: false })
    }
}




