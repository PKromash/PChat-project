import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,

  creator: String,
  avatar: String,
  name: String,
  message: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  image: String, // base64 encoded string
  likes: {
    type: [String],
    default: [],
  },
  comments: [
    {
      commenter: {
        type: String,
        default: "Anonymous", // TODO: change to name of user after adding auth
      },
      comment: String,
      // TODO: add createdAt date
    },
  ],
});

const BlogPost = mongoose.model("post", postSchema);

export default BlogPost;
