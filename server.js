const fs = require('fs');
const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const crypto = require('crypto');
const cors = require('cors');
const FileStore = require('session-file-store')(session); // 세션을 파일에 저장
const cookieParser = require('cookie-parser');

const app = express();

const client = mysql.createConnection({
    host : 'localhost',
    port : '3306',
    user : 'root',
    password : '12345678',
    database : 'tk_db'
})

const server = require('http').createServer(app);
const index = require('./index');

app.use(cors());
app.use(express.static(path.join(__dirname,'/public')));

app.use(bodyParser.urlencoded({extended:false}));

app.use(session({
    secret: 'blackzat', // 데이터를 암호화 하기 위해 필요한 옵션
    resave: false, // 요청이 왔을때 세션을 수정하지 않더라도 다시 저장소에 저장되도록
    saveUninitialized: true, // 세션이 필요하면 세션을 실행시칸다(서버에 부담을 줄이기 위해)
    store : new FileStore() // 세션이 데이터를 저장하는 곳
}));

app.use('/', index);

app.use(express.json());


//회원가입 post
app.post('/register',(req,res)=>{
    console.log('회원가입 하는중')
    const body = req.body;
    const id = body.id;
    const pw = body.pw;
    const name = body.name;

    client.query('select * from users where id=?',[id],(err,data)=>{
        if(data.length == 0){
            console.log('회원가입 성공');
            client.query('insert into users(id, name, pw) values(?,?,?)',[
                id, name, pw
            ]);
            res.send({success: 1})
        }else{
            console.log('회원가입 실패');
            res.send({success: 0})
        }
    });
});


//로그인 post
app.post('/login',(req,res)=>{
    console.log(req);
    const body = req.body;

    const id = body.id;
    const pw = body.pw;
    
    client.query('select * from users where id=?',[id],(err,data)=>{
        // 로그인 확인
        if(data[0]==null){
            data[0]='default';
        }
        
        console.log(data[0]);
        console.log(id);
        console.log(data[0].id);
        console.log(data[0].pw);
        console.log(id == data[0].id);
        console.log(pw == data[0].pw);
        
        if(id == data[0].id && pw == data[0].pw){
            console.log('로그인 성공');
            res.send({success: 1, userName: data[0].name});
        }else{
            console.log('로그인 실패');
            res.send({success: 0});
        }
    });
    
});

server.listen(8080, () => {
    console.log('server is running on 8080');
})