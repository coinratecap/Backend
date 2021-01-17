const express = require('express')
const blogController = require("../controllers/blog.controller");
const multer = require("../../config/multer")

const router = express.Router();

router.post("/add", multer.upload.any(), blogController.addPost);
router.get("/all-post", blogController.getAllPost);
router.get("/post-details/:id", blogController.getPostDetails);
router.delete("/delete-post/:id", blogController.deletePost)
router.put("/update-post/:id", multer.upload.any(), blogController.updatePost)

module.exports = router;