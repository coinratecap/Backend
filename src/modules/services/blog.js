const Blog = require("../models/Blog");

exports.addPost = async payload => {
    let post = new Blog(payload);
    post = await post.save();
    return post
}

exports.getAllPost = async () => {
    const posts = await Blog.find();
    return posts;
};

exports.getPostDetails = async id => {
    const post = await Blog.findOne({id})
    return post
}

exports.deletePost = async (id) => {
    const post = Blog.findOne({id})
    await Blog.deleteOne(post);
    return post
}

exports.updatePost = async (id,payload) => {
    const post = await Blog.findOne({id})
    await Object.assign(post, payload);
    await post.save()
    return post
}



