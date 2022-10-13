const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect("mongodb://localhost:27017/4weeks") //나중에 바꿔야됨 127.0.0.1
    .catch(err => console.log(err));
};


mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});


module.exports = connect;