const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "California"
  code: { type: String }, // optional
  country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true },
}, { timestamps: true });

module.exports = mongoose.model('State', stateSchema); 
