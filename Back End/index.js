const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 8000;
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
// const fileUpload = require('express-fileupload');
// app.use(fileUpload());
app.use(cors());
app.use(express.json());
//For Making folder publically available
app.use("/uploads", express.static("uploads"));
const signupRoutes = require("./Routes");
app.use("/api/v1/", signupRoutes);

// For findUpdate disable deprecated warning
mongoose.set("useFindAndModify", false);

require("dotenv").config();

const uri = process.env.ATLAS_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .catch((e) => console.log("Error", e));
const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("MongoDB database connection established successfully");
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch(() => {
    console.log("MongoDb database connection failed");
  });
