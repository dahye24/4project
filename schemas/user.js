const mongoose = require("mongoose");

const UserModel = new mongoose.Schema({
  nickname: String,
  password: String,
});
UserModel.virtual("userId").get(function () {
  return this._id.toHexString();
});
UserModel.set("toJSON", {
  virtuals: true,
});
module.exports = mongoose.model("User", UserModel);