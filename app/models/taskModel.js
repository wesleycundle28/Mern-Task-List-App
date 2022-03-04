const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema(
  {
    title: { type: String, required: false },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    bufferCommands: true,
    autoCreate: true,
  }
);

module.exports = mongoose.model("Task", TaskSchema);
