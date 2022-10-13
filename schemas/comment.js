const mongoose = require('mongoose');

const commentModel = new mongoose.Schema({  //new mongoose.Schema -> mongoose 옆에는 항상 Schema여야한다. 정해진 문법이 그렇다. S 대문자!! 
   
      userId: {
        type: String,
        required: true,
      },    
      postId: {                   //////없어도 되나????
            type: String,
            required: true,
      },
      nickname: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      }
    },
    {
      timestamps: true
    });
    
    
    // {  "data": [{ "commentId": 2, "userId": 1  "nickname": "Developer", 
    //      "comment": "안녕하세요 2번째 댓글입니다.", "createdAt": "2022-07-25T07:54:24.000Z", "updatedAt": "2022-07-25T07:54:24.000Z"}, 
    

module.exports = mongoose.model("Comment", commentModel);