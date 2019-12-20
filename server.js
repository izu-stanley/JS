const express = require("express");
const mongoose = require("mongoose");
users = require("./routes/api/users");
profile = require("./routes/api/profile");
posts = require("./routes/api/posts");
bodyParser = require("body-parser");

const app = express();
const db = require("./config/keys").mongoURI;

//body parser middle ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connect to mongodb
mongoose
  .connect(db)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(err => console.log(err));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//use routes
app.use("/api/posts", posts);
app.use("/api/profile", profile);
app.use("/api/users", users);

//Use environment port or post 5000
port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
