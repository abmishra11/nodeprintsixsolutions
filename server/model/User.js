const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    emailVerified: { type: Boolean, default: false },
    role: { type: String, enum: ["ADMIN", "VENDOR", "USER"], default: "USER" },
    status: { type: Boolean, default: false },
    refreshToken: { type: String },
    addresses: [addressSchema], // <-- array of embedded addresses
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
