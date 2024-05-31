const router = require("express").Router();
const multer = require("multer");

// requiring multer config
const storage = require("../middleware/multerConfig");
const upload = multer({ storage: storage });

//  requiring controllers
const {
  createBlog,
  readAllBlog,
  readSingleBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blogController");

// creating and reading all blog
router
  .route("/blog")
  .get(readAllBlog)
  .post(upload.single("blogImage"), createBlog);

//reading single blod, updating and deleting it
router
  .route("/blog/:id")
  .get(readSingleBlog)
  .patch(upload.single("blogImage"), updateBlog)
  .delete(deleteBlog);

module.exports = router;
