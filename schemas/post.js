const mongoose = require('mongoose');

const postModel = new mongoose.Schema({


      userId: {
        type: Number,
        required: true,
      },
     nickname: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      likes: {
        type: Number
        
      }
    },
    {
      timestamps: true
    });
    


// "data": {    "postId": 2,    "userId": 1,    "nickname": "Developer",    "title": "안녕하세요 수정된 게시글 입니다.",  
//   "content": "안녕하세요 content 입니다.",  "createdAt": "2022-07-25T07:45:56.000Z",    "updatedAt": "2022-07-25T07:52:09.000Z",    "likes": 0}

module.exports = mongoose.model("Post", postModel);