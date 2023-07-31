const express = require("express");
const router = express.Router();

const Todo = require("../models/Todos");

router.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// create a new todo
router.post("/new", async (req, res) => {
  const newTodo = new Todo(
    req.body // What the Vue App is sending
    // {
    //   author: "Flanders",
    //   todo: "Go to canada",
    // }
  );
  const savedTodo = await newTodo.save();
  res.json(savedTodo);
});

// getting by id
router.get("/get/:id", async (req, res) => {
  let t;
  t = await Todo.findById({ _id: req.params.id }).catch((err) => {
    return {};
  });
  res.json(t);
});

// delete a to by id
router.post("/delete/:id", async (req, res) => {
  const tDelete = await Todo.findByIdAndDelete({ _id: req.params.id });
  res.json(tDelete);
});

// update a to by id
router.post("/update/:id", async (req, res) => {
  const tUpdate = await Todo.updateOne(
    { _id: req.params.id },
    { $set: req.body }
    // {
    //   author: "Bart",
    //   todo: "Skating",
    // }
  );
  res.json(tUpdate);
});

module.exports = router;
