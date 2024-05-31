const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogModel = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    blogImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogModel);
module.exports = Blog;
