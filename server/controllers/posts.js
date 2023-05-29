import mongoose from "mongoose";
import BlogPost from "../models/posts.js";

export const getPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();
    res.status(200).json(blogPosts);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new BlogPost(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};

export const updatePost = async (req, res) => {
  const {id: _id} = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id");
  }
  const updatedPost = await BlogPost.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.json(updatedPost);
};

export const likePost = async (req, res) => {
  const {id: _id} = req.params;
  if (!req.userId) {
    return res.json({message: "Unauthenticated"});
  }
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id");
  }
  const post = await BlogPost.findById(_id);
  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await BlogPost.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const {id: _id} = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id");
  }
  await BlogPost.findByIdAndRemove(_id);
  res.json({message: "Post deleted successfully"});
};

export const commentPost = async (req, res) => {
  const {id: _id} = req.params;
  const {comment, commenter} = req.body;
  if (!req.userId) {
    return res.json({message: "Unauthenticated"});
  }
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id");
  }
  const post = await BlogPost.findById(_id);
  post.comments.push({comment: comment.comment, commenter});

  const commentedPost = await BlogPost.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.json(commentedPost);
};

export const deleteComment = async (req, res) => {
  const {id: postId} = req.params;
  const {commentId} = req.body;

  if (!req.userId) {
    return res.json({message: "Unauthenticated"});
  }

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(404).send("No post with that id");
  }

  try {
    const post = await BlogPost.findById(postId);

    post.comments = post.comments.filter(
      (comment) => comment._id.toString() !== commentId
    );

    await post.save();

    res.json(post);
  } catch (error) {
    res
      .status(500)
      .json({message: "An error occurred while deleting the comment"});
  }
};
