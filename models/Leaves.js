const mongoose = require("mongoose");
// mongoose.set('debug', true)

const EmpolyeesSchema = new mongoose.Schema({
  type: String,
  staff_id: mongoose.Schema.ObjectId,
  reason: String,
  approval: Boolean,
  approver: [{ type: String, required: false }],
  cert: Boolean,
  cert_no: String,
  cert_issuer: String,
  end_date: Date,
  start_date: Date,
  duration: mongoose.Schema.Types.Number,
});

module.exports = mongoose.model("leaves", EmpolyeesSchema);
