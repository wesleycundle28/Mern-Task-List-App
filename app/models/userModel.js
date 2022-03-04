const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: false,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, bufferCommands: true, autoCreate: true }
);

module.exports = mongoose.model("User", UserSchema);
