const mongoose = require("mongoose");

try {
  exports.dbConfig = async (URI) => {
    await mongoose.connect(URI);
    console.log("DataBase Connected Successfully");
  };
} catch (err) {
  console.log(err);
}
