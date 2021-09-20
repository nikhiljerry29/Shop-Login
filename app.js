require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/public`));
app.set("view engine", "ejs");

const centralRoute = require("./routes/central.route");
app.use("/", centralRoute);

let port = process.env.PORT;
app.listen(port, (err) => {
  if (!err) console.log(`Application started at port :: ${port}`);
  else console.log("Error at starting application.");
});
