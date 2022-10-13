const express = require("express");

const Users = require("../schemas/user");
const jwt = require("jsonwebtoken");

const authMiddleware = require("../middlewares/auth-middleware");

const router = express.Router();

router.post("/login", async (req, res) => {                        //로그인하기!
    const { nickname, password } = req.body; //닉네임과 비번 불러오기

    const user = await Users.findOne({nickname}); 

    if (!user || password !== user.password) {   // 입력한 값이 데이터 베이스에 없으면
        res.status(400).send({
            errorMessage: '닉네임 또는 패스워드가 잘못됐습니다.',
        });
        return;
    }
    
    res.send({
    token: jwt.sign({ userId: user.userId }, "my-secret-key"), //sign을 해야 토큰을 만들 수 있다. 뒤에 시크릿 키 중요
         //토큰이라는 키에다가 jwt 토큰을 반환해야 정상적으로 동작한다
    });
});

// "/users/me"라는 경로로 들어오는 경우에만 authMiddleware 미들웨어가 붙게된다.
router.get("/user/me", authMiddleware, async (req, res) => {               //로그인 성공하면 닉네임 보여주기
   const { user } = res.locals; //res.locals라는 객체 안에 있는 user라는 키가 변수 user에 들어간다.
    res.send({
        user: {
            nickname: user.nickname,
        },
    });
});

module.exports = router;