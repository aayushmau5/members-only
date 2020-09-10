const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 1 },
  detail: { type: String, required: true, minlength: 1 },
  createdTime: { type: Date, default: Date.now },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Message", MessageSchema);
