const express=require("express");
const bodyParser=require("body-parser");
const fs=require("fs");
const app=new express();

const port=8887;
let regBase64=/^data:image\/\w+;base64,/;

app.use(express.static("img"));

app.use(bodyParser.json({limit:'5mb'}));
app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin','http://localhost:8080');
    res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');
    res.header('Access-Control-Allow-Headers','Content-Type');
    res.header('Access-Control-Allow-Credentials','true');

    if(req.method==='OPTIONS'){
        res.end();
    }else{
        next();
    }
});

//接收图片 写入图片
app.post("/upimage",(req,res)=>{
    let base64=req.body.src.replace(regBase64,'');
    let newJPG=new Buffer(base64, 'base64');

    fs.writeFile("./img/1.jpg",newJPG,function(err){//用fs写入文件
        if(err){
            console.log(err);
        }else{
            console.log('写入成功！');
        }
    })
});

//读取图片
app.get("/getimage",(req,res)=>{
    console.log(req.headers);
    res.json({src:"http://"+req.headers.host+"/1.jpg"});
});

//获取菜谱
app.post("/addmenu",(req,res)=>{
    console.log(req.body);
    res.json({success:"ok"});
});


app.listen(port);