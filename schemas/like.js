const mongoose = require('mongoose');

const likeModel = new mongoose.Schema({
   
    postId: {
        type: String
      },
    userId: {
       type: String
     },
      nickname: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      likes: {
        type: Number,
       
      }
    },
    {
      timestamps: true
    });
    


module.exports = mongoose.model("Like", likeModel);


//{  "data": [{ "postId": 4,     
    //  "userId": 1,  "nickname": "Developer",  "title": "안녕하세요 4번째 게시글 제목입니다.",  "createdAt": "2022-07-25T07:58:39.000Z",    
    //    "updatedAt": "2022-07-25T07:58:39.000Z",  "likes": 1 }]}