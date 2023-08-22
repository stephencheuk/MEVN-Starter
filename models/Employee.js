const mongoose = require("mongoose");
// mongoose.set('debug', true)
const EmpolyeesSchema = new mongoose.Schema({
  name: String,
  employ_date: Date,
  salary: Number,
});

module.exports = mongoose.model("employee", EmpolyeesSchema);
