const express = require("express");

const comments = require("../schemas/comment.js");

const authMiddleware = require("../middlewares/auth-middleware");

const router = express.Router();

// 댓글 작성  postId는 작성한 글에 댓글을 달아야 하니 작성한글을 판별하는 아이디(post에서 생성된것) / commentId는 댓글 생성하면 알아서 생기는 아이디
router.post("/comments/:postId", authMiddleware, async (req, res) => { 

    const {postId} = req.params;   
    const { comment } = req.body;              
    const nickname = res.locals.user.nickname; 
   
    if(comment === ''){
        res.json({"message": "댓글을 작성해주세요"})
    }else {
        await comments.create({ postId,nickname,comment});  //comments에다 넣어주기
        res.json({ "message": "댓글을 생성하였습니다." });   
    }
});


router.get("/comments/:postId", async (req,res) => {
    // 댓글목록 조회
    
    const {postId} = req.params
    const Comments = await comments.findAll()
    const commt = Comments.map((x) => {
        commentId = x._id,
        nickname = x.nickname,
        comment = x.comment,
        createdAt = x.createdAt,
        updatedAt = x.updatedAt
        

    return {'commentId' :commentId, 'nickname' : nickname, 'comment' : comment, 'createdAt' : createdAt, 'updatedAt' : updatedAt}


    })
    res.json({ commentlist: commt});
})



router.put("/comments/:commentId", authMiddleware, async (req,res) => { 
// 댓글수정
  const {commentId} = req.params;
  const { comment } = req.body;
  const nickname = res.locals.user.nickname;

  const userpass = await comments.findOne({_id : commentId})
  console.log(userpass.password)
  if(!userpass.length){
    return res.status(400).json({ result : "정보가 다릅니다."})
  }
    await comments.updateOne({_id : commentId},{$set: {comment}})
    res.json({ result : "댓글수정 완료"})                              
  

})

router.delete("/comments/:commentId",authMiddleware, async (req,res) => {
    // 댓글삭제

  
    const {commentId} = req.params;
    const {user} = res.locals;

    const userpass = await comments.findOne({_id : commentId})
    if(user.nickname === userpass.nickname){
        await comments.deleteOne({_id : commentId})
        res.send({ result : "삭제 완료"})
    } else {
        return res.status(400).json({ result : "정보가 다릅니다"})
    }

})



module.exports = router;