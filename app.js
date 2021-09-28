require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// view configs
app.use(express.static(`${__dirname}/public`));
app.set("view engine", "ejs");

const centralRoute = require("./routes/central.route");
app.use(centralRoute);

app.use((req, res) => {
  res.status(404).render("404");
});

let port = process.env.PORT;
app.listen(port, async (err) => {
  if (!err) console.log(`Application started at :: http://localhost:${port}`);
  else console.log("Error at starting application.");
});
