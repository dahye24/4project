const express = require("express");

const {Users} = require("../schemas/user");

const router = express.Router();


router.post("/signup", async (req, res) => {               //회원가입
    const { nickname, password, confirmPassword} = req.body;    //req.body는 json형식만 받을수있다.
    const validatedName = /^[A-Za-z0-9]{3,}$/;
    
    //console.log(validatedName.test(nickname))
    if(validatedName.test(nickname) === false) {      //!validatedName.test(nickname)도 사용가능
      res.status(400).send({
            errorMessage: '대소문자 및 숫자를 사용해서 3자 이상 작성하세요.', 
        });
        return;  //return 하지 않으면 밑에것도 실행된다.  
    }

    if(password !== confirmPassword) {   // 비밀번호 재확인
        res.status(400).send({
            errorMessage: '패스워드가 패스워드 확인란과 동일하지 않습니다.', 
        });
        return;
    }

    const existUsers = await Users.findone({ where: {nickname} });    //닉네임이 겹치는게 있는지 찾기
    if(existUsers.length) {   //하나라도 있다면 에러 메세지
        res.status(400).send({
            errorMessage: '이미 사용중인 닉네임입니다.',
        });
        return;
    }

    const user = new User({ nickname, password });  //사용자 저장하기
    await user.save();

    res.status(201).send({  "message": "회원 가입에 성공하였습니다."});  //사용자가 생성 됐으므로 (Rest API 원칙에 created라는 201이라는 status code가 있다.)
});


module.exports = router;