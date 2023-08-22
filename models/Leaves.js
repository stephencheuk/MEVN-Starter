const mongoose = require("mongoose");
// mongoose.set('debug', true)
const EmpolyeesSchema = new mongoose.Schema({
  type: String,
  staff_id: mongoose.Schema.ObjectId,
  reason: String,
  approval: Boolean,
  approver: [
    { type: String },
  ],
  cert: Boolean,
  cert_no: String,
  cert_issuer: String,
  end_date: Date,
  start_date: Date,
  duration: mongoose.Schema.Types.Double,
});

module.exports = mongoose.model("employee", EmpolyeesSchema);
