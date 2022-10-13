const express = require("express");
const connect = require("./schemas/indexs.js")
const app = express();

const postsRouter = require('./routes/posts.js')
const signupRouter = require('./routes/signup.js')
const loginRouter = require('./routes/login.js')
const commentsRouter = require('./routes/comments.js')
const authMiddleware = require("./middlewares/auth-middleware");

connect();

app.use(express.json())  //bodyparser 역할 

app.use("/api",[postsRouter, commentsRouter,  signupRouter, loginRouter]); 
// app.use("/api", goodsRouter); 두개 이상일때는 []배열처럼 쓸수있다.


app.use( express.urlencoded({ extended: false })); //url에서 querystring을 동작하기 위함

app.get('/', (req,res)=>{
  res.send("겟입니다!");
  
});

app.listen(8080, () => {
  console.log("서버가 요청을 받을 준비가 됐어요");
});