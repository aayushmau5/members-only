const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 1,
  },
  lastname: {
    type: String,
    required: true,
    minlength: 1,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Minimum Password Length is 6 Characters"],
  },
});

UserSchema.virtual("fullname").get(function () {
  return this.firstname + " " + this.lastname;
});

UserSchema.virtual("url").get(function () {
  return "/users/" + this._id;
});

// UserSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

module.exports = mongoose.model("User", UserSchema);
