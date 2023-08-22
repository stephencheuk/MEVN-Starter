const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Method", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "auth-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// database stuff

const uri = "mongodb://127.0.0.1:27017/crud01";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => console.log("db connection error", error));

app.use(bodyParser.json());
app.use(cors());

app.get("/api/", (req, res) => {
  res.send("Welcome");
});

const TodosRoute = require("./routes/Todos.js");
app.use("/api/todos", TodosRoute);
app.use("/api/employee", require("./routes/Employee.js"));
app.use("/api/leaves", require("./routes/Leaves.js"));

app.listen(8000, () => {
  console.log("server started");
});
