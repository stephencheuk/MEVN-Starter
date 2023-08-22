const express = require("express");
const router = express.Router();

const Employee = require("../models/Employee");

router.get("/", async (req, res) => {
  // fetch(`http://localhost:8000/api/employee?search=${filter}&order=${descending}&sortBy=${sortBy}&from=${startRow}&limit=${count}`)


  let Search_FIND = {};

  let Search_OR = []
  if(req.query.search){
    let reg = new RegExp(req.query.search);
    Search_OR.push({ "name": new RegExp(req.query.search) })
    // Search_OR.push({ "salary": new RegExp(req.query.search) })
    Search_OR.push({ $where: "String(this.salary).match("+reg+") != null" })
    Search_FIND['$or'] = Search_OR;
  }
  let Sorter = [];
  if(req.query.sortBy){
    Sorter.push([req.query.sortBy, req.query.order == 'false' ? 1 : -1])
  }
  Sorter.push(['name', 1])
  console.log(Search_FIND, Sorter, req.query.limit, req.query.from)
  const records = Employee
                          .find(Search_FIND)
                          .sort(Sorter)
                          .limit(req.query.limit)
                          .skip(req.query.from)
  const total = Employee.count(Search_FIND)
  const result = await Promise.all([records, total])

  res.json({
    "data": result[0],
    "total": result[1]
  })
});

// create a new todo
router.post("/new", async (req, res) => {
  const newEmployee = new Todo(
    req.body // What the Vue App is sending
    // {
    //   author: "Flanders",
    //   todo: "Go to canada",
    // }
  );
  const savedEmployee = await newEmployee.save();
  res.json(savedEmployee);
});

// getting by id
router.get("/get/:id", async (req, res) => {
  let rec;
  rec = await Employee.findById({ _id: req.params.id }).catch((err) => {
    return {};
  });
  res.json(rec);
});

// delete a to by id
router.post("/delete/:id", async (req, res) => {
  const tDelete = await Employee.findByIdAndDelete({ _id: req.params.id });
  res.json(tDelete);
});

// update a to by id
router.post("/update/:id", async (req, res) => {
  const tUpdate = await Employee.updateOne(
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
