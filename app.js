// requiring Express
const express = require("express");
const app = express();

// setting up CORS / SOP
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  })
);

//parsing json data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// requiring dotenv modules to fetch data from .env file
require("dotenv").config();
const port = process.env.PORT;
const URI = process.env.mongoURI;

// Connecting to DataBase
const { dbConfig } = require("./config/dbConfig");
dbConfig(URI);

// requiring model
const Blog = require("./model/blogModel");

app.get("/", (req, res) => {
  res.status(200).json({
    message: "This is the landing page of the site",
  });
});

app.post("/createBlog", async (req, res) => {
  await Blog.create({
    title: req.body.title,
    subTitle: req.body.subTitle,
    description: req.body.description,
  });

  res.status(201).json({
    message: "Blog created Successfully",
  });
});

app.get("/readBlog", async (req, res) => {
  const blogs = await Blog.find();

  if (blogs.length === 0) {
    res.status(404).json({
      message: "No any Blogs Found",
    });
  } else {
    res.status(200).json({
      message: "Blog fetched Successfully",
      blogs: blogs,
    });
  }
});

app.get("/readBlog/:id", async (req, res) => {
  const id = req.params.id;

  const oneBlog = await Blog.findById();
  if (!oneBlog) {
    res.status(404).json({
      message: "No any Blog found on this id",
    });
  } else {
    res.status(200).json({
      message: "Blog with the ID fetched successfully",
    });
  }
});

app.patch("/updateBlog/:id", async (req, res) => {
  const id = req.params.id;

  const { title, subTitle, description } = req.body;

  console.log(req.params);
  console.log(req.body);

  await Blog.findByIdAndUpdate(id, {
    title,
    subTitle,
    description,
  });

  res.status(200).json({
    message: "Blog updated Successfully",
  });
});

app.delete("/deleteBlog/:id", async (req, res) => {
  const id = req.params.id;

  console.log(id);

  if (!id) {
    res.status(404).json({
      message: "Blog with this id not founded",
    });
  } else {
    await Blog.findByIdAndDelete(id);

    res.status(200).json({
      message: "Blog deleted successfully",
    });
  }
});

app.listen(port, (req, res) => {
  console.log("The BackEnd has successfully ran on port 3000");
});
