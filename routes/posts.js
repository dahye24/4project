const express = require("express");

const Posts = require("../schemas/post.js");
const Likes = require("../schemas/like.js");
const authMiddleware = require("../middlewares/auth-middleware");

const router = express.Router();


// 게시글 작성 POST  
router.post("/posts", authMiddleware, async (req, res) => {

     const { title,content } = req.body;  //바디형식으로 요청이 넘어왔다

     const {userId,nickname} = res.locals.user  //계정 id,nickname받기

     await Posts.create({ userId,nickname,title,content,likes:0});  //Posts에다 넣어주기

    res.json({ "message": "게시글 작성에 성공하였습니다." });
});

// 게시글 조회 GET ( ex) localhost:3000/api/posts )
router.get("/posts", async (req, res) => {
      
    const posts = await Posts.find({})
    posts.sort((a,b) => b.likes - a.likes)
    const post = posts.map((x) => {   
        postId = x.postid,
        userId = x.usesrId  
        nickname = x.nickname,
        title = x.title,
        createdAt = x.createdAt,
        updatedAt = x.updatedAt,
        likes = x.likes

    return {'postId' :postId, 'userId' : userId, 'nickname' : nickname, 'title' : title,  'createdAt' : createdAt, 'updatedAt' : updatedAt,'likes' : likes}
})

    res.json({ postlist : post });
});


router.get("/posts/like", authMiddleware, async (req, res) => {  //좋아요
    const {user} = res.locals;
    const likes = await Likes.findAll({ where: {user: user.nickname} })
    const array = [];
    likes.map((a)=> array.push(a.like))
    const likedPosts = [];
    for(let i = 0; i < likes.length; i++){
        const likes = await Posts.findByPk(array[i]);
        if(likes){likedPosts.push(likes)} else { likedPosts.push("삭제된 게시글 입니다")}
    }
     res.json( likedPosts );
})


// 게시글 상세 조회 GET ( ex) localhost:3000/api/posts/postid값 )
router.get("/posts/:postId", async (req, res) => {

    const {postId} = req.params;   //params는 매개변수 

    const post = await Posts.findOne({_id : postId})  
   
    res.json({ detail : post });
});

// 게시글 수정 PUT ( ex) localhost:3000/api/posts/postid값 )
router.put("/posts/:postId", authMiddleware, async (req, res) => {

    const {postId} = req.params;
    const { title,content } = req.body;
    const userId = res.locals.user._id;

    const post = await Posts.findOne({_id : postId}) 
    if(String(userId) === post.userId){
        await Posts.updateOne({_id : postId},{$set: {title, content}})
        res.send({ result : "게시글을 수정하였습니다."})
    } else {
        res.send({ result : "정보가 다릅니다"})
    }

});

// 게시글 삭제 DELETE ( ex) localhost:3000/api/posts/postid값 )
router.delete("/posts/:postId",authMiddleware, async (req, res) => {

    const {postId} = req.params;
    const {user} = res.locals;
    
    const post = await Posts.findOne({_id : postId})
    if(String(user._Id) === post.userId){
        await Posts.deleteOne({_id : postId})
        res.send({ result : "게시글을 삭제하였습니다."})
    } else {
        res.send({ result : "정보가 다릅니다"})
    }
});

router.put("/posts/:postsId/like", authMiddleware, async (req, res) => {
    const { postsId } = req.params
    const { like } = req.body
    const { user } = res.locals

    if(like) {
        await Likes.create({user:user.nickname, like: postsId});
        await Posts.increment( {likes: 1}, {where: {postsId: postsId}});
       res.json({  "message": "게시글의 좋아요를 등록하였습니다."})
    } else {
        await Likes.destroy({where: {user: user.nickname, like: postsId}});
        await Posts.decrement({likes: 1}, {where: {postsId: postsId}});
        res.json({  "message": "게시글의 좋아요를 취소하였습니다."})
     } 
});

module.exports = router;