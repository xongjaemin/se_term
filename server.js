const fs = require('fs');
const mysql = require('mysql2'); // module to use mysql DB
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const crypto = require('crypto'); // module to use encrypt
const cors = require('cors');
const FileStore = require('session-file-store')(session); // save session
const cookieParser = require('cookie-parser');

const app = express(); // module that used to open server

const client = mysql.createConnection({ // DB information
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
    secret: 'blackzat', // data encrypt
    resave: false, // if requeset resave without session
    saveUninitialized: true, // reduce server burden
    store : new FileStore() // place where store data
}));

app.use('/', index);

app.use(express.json());


//sign up post
app.post('/register',(req,res)=>{
    console.log('회원가입 하는중')
    const body = req.body;
    const id = body.id;
    const pw = body.pw;
    const name = body.name;

    client.query('select * from users where id=?',[id],(err,data)=>{ // add information in mysql DB
        if(data.length == 0){ // check ID diplication
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


//login post
app.post('/login',(req,res)=>{
    console.log(req);
    const body = req.body;

    const id = body.id;
    const pw = body.pw;
    
    client.query('select * from users where id=?',[id],(err,data)=>{ // check ID from DB
        // login check 
        if(data[0]==null){
            data[0]='default';
        }
        
        console.log(data[0]);
        console.log(id);
        console.log(data[0].id);
        console.log(data[0].pw);
        console.log(id == data[0].id);
        console.log(pw == data[0].pw);
        
        if(id == data[0].id && pw == data[0].pw){ // login success
            console.log('로그인 성공');
            res.send({success: 1, userName: data[0].name});
        }else{
            console.log('로그인 실패');// login failed
            res.send({success: 0});
        }
    });
    
});

server.listen(8080, () => { // open local server port 8080
    console.log('server is running on 8080');
})