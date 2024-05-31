const mongoose = require("mongoose");
const Blog = require("../model/blogModel");

// creating blog
exports.createBlog = async (req, res) => {
  const { title, subTitle, description } = req.body;
  const file = req.file;

  if (!title || !subTitle || !description || !file) {
    return res.status(400).json({
      message: "Please enter all the data.",
    });
  }

  const blogExist = await Blog.find({ title });

  if (blogExist.length > 0) {
    return res.status(400).json({
      message: "Blog with this title already exist.",
    });
  }

  await Blog.create({
    title,
    subTitle,
    description,
    blogImage: `${process.env.IMG_PATH}/${req.file.filename}`,
  });

  res.status(200).json({
    message: "Blog created successfully.",
  });
};

// read all Blog
exports.readAllBlog = async (req, res) => {
  const blogExist = await Blog.find();

  if (!blogExist.length === 0) {
    return res.status(400).json({
      message: "No Blogs found.",
    });
  }

  res.status(200).json({
    message: "All Blogs fetched successfully.",
    blogExist,
  });
};

// read single blog
exports.readSingleBlog = async (req, res) => {
  const id = req.params.id;

  const validId = mongoose.Types.ObjectId.isValid(id);

  if (!validId) {
    return res.sataus(400).json({
      message: "Invalid Id.",
    });
  }

  const blogExist = await Blog.findById(id);

  if (!blogExist) {
    return res.status(400).json({
      message: "Blog with this id not founded.",
    });
  }

  res.status(200).json({
    message: "Blog fetched successfully.",
    blogExist,
  });
};

// updating Blog
exports.updateBlog = async (req, res) => {
  const id = req.params.id;
  const { title, subTitle, description } = req.body;

  const validId = mongoose.Types.ObjectId.isValid(id);

  if (!validId) {
    return res.status(400).json({
      message: "Invalid Id.",
    });
  }

  const blogExist = await Blog.findById(id);

  if (!blogExist) {
    return res.status(400).json({
      message: "Blog with this id not founded.",
    });
  }

  await blogExist.updateOne({
    title,
    subTitle,
    description,
    blogImage: `${process.env.IMG_PATH}/${req.file.filename}`,
  });

  res.status(200).json({
    message: "Blog updated successfully.",
  });
};

// deleting blog
exports.deleteBlog = async (req, res) => {
  const id = req.params.id;

  const validId = mongoose.Types.ObjectId.isValid(id);

  if (!validId) {
    return res.status(400).json({
      message: "Invalid Id.",
    });
  }

  const blogExist = await Blog.findById(id);

  if (!blogExist) {
    return res.status(400).json({
      message: "Blog with this id not founded.",
    });
  }

  await blogExist.deleteOne();

  res.status(200).json({
    message: "Blog deleted successfully.",
  });
};
