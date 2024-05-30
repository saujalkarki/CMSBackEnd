const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

// allowing cross origin resource sharing CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  })
);

//parsing json data and url encoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// requiring dotenv modules to fetch data from .env file
const port = process.env.PORT;
const URI = process.env.MONGO_URI;

// Connecting to DataBase
const dbConfig = require("./config/dbConfig");
dbConfig(URI);

// setting up routes
const blogRoute = require("./route/blogRoute");
app.use("", blogRoute);

// listening to port
app.listen(port, () => {
  console.log(`Server has successfully started on port ${port}.`);
});
