const express=require("express");
const bodyParser=require("body-parser");
const fs=require("fs");
const path=require('path');
const app=new express();


app.use(express.static(path.resolve('./mock')));
//导入数据
let menuClassification=require('./mock/menuClassification');//导入菜品分类
let homedishes=require('./mock/homeDishes');//导入家常菜列表
let fastFood=require('./mock/fastFood');//导入快手菜列表
let downMeal=require('./mock/downMeal');//导入下饭菜列表
let breakFast=require('./mock/breakFast');//导入早餐列表
let meat=require('./mock/meat');//导入肉类列表
let fish=require('./mock/fish');//导入鱼类列表
let bearFood=require('./mock/bearFood');//导入下酒菜列表
let vegetableDish=require('./mock/vegetableDish');//导入素菜列表
let dessert=require('./mock/dessert');//导入饮品列表
let indexData=require('./mock/indexData');



let regBase64=/^data:image\/\w+;base64,/;  //匹配base64

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


//获取首页数据
app.get('/indexdata',function (req, res) {
    res.send(indexData)
});

//获取分类列表
app.get('/menuClassification',function (req, res) {
    res.send(menuClassification)
});


//获取家常菜的列表
app.get('/homedishes',function (req, res) {

    let {offset,limit}=req.query;
    console.log(offset, limit);
    let homeList=[];
    for (let i = parseFloat(offset); i < parseFloat(limit)+parseFloat(offset); i++) {
        homeList.push(homedishes.list[i]);
    }
    let hasMore=true;
    if(offset==5){
        hasMore=homedishes.hasMore=false;
    }
    res.json({list:homeList,hasMore});
});


//家常菜详情页
app.get('/homedishes/:homeId',function (req, res) {
    let id=req.params.homeId;
    console.log(id);
    let item=homedishes.list.find(item=>parseFloat(id)===item.homeId);
    res.send(item);
});



//获取快手菜列表
app.get('/fastFood',function (req, res) {
    let {offset,limit}=req.query;
    let fastList=[];
    for (let i = parseFloat(offset); i < parseFloat(limit)+parseFloat(offset); i++) {
        fastList.push(fastFood.list[i]);
    }
    let hasMore=true;
    if(offset==5){
        hasMore=fastFood.hasMore=false;
    }
    res.json({list:fastList,hasMore});
});

//获取快手菜详情页
app.get('/fastFood/:fastId',function (req, res) {
    let id=req.params.fastId;
    console.log(id);
    let item=fastFood.list.find(item=>parseFloat(id)===item.fastId);
    res.send(item);
});

//获取下饭菜列表
app.get('/downMeal',function (req, res) {
    let {offset,limit}=req.query;
    let downList=[];
    for (let i = parseFloat(offset); i < parseFloat(limit)+parseFloat(offset); i++) {
        downList.push(downMeal.list[i]);
    }
    let hasMore=true;
    if(offset==5){
        hasMore=downMeal.hasMore=false;
    }
    res.json({list:downList,hasMore});
});


//获取下饭菜详情页
app.get('/downMeal/:downId',function (req, res) {
    let id=req.params.downId;
    console.log(id);
    let item=downMeal.list.find(item=>parseFloat(id)===item.downId);
    res.send(item);
});

//获取早餐列表
app.get('/breakFast',function (req, res) {
    let {offset,limit}=req.query;
    let breakList=[];
    for (let i = parseFloat(offset); i < parseFloat(limit)+parseFloat(offset); i++) {
        breakList.push(breakFast.list[i]);
    }
    let hasMore=true;
    if(offset==5){
        hasMore=breakFast.hasMore=false;
    }
    res.json({list:breakList,hasMore});
});

//获取早餐菜详情页
app.get('/breakFast/:breakId',function (req, res) {
    let id=req.params.downId;
    console.log(id);
    let item=breakFast.list.find(item=>parseFloat(id)===item.breakId);
    res.send(item);
});

//导入肉类列表
app.get('/meat',function (req, res) {
    let {offset,limit}=req.query;
    let meatList=[];
    for (let i = parseFloat(offset); i < parseFloat(limit)+parseFloat(offset); i++) {
        meatList.push(meat.list[i]);
    }
    let hasMore=true;
    if(offset==5){
        hasMore=meat.hasMore=false;
    }
    res.json({list:meatList,hasMore});
});

//获取肉类菜详情页
app.get('/meat/:meatId',function (req, res) {
    let id=req.params.meatId;
    console.log(id);
    let item=meat.list.find(item=>parseFloat(id)===item.meatId);
    res.send(item);
});

//导入鱼类列表
app.get('/fish',function (req, res) {
    let {offset,limit}=req.query;
    let fishList=[];
    for (let i = parseFloat(offset); i < parseFloat(limit)+parseFloat(offset); i++) {
        fishList.push(fish.list[i]);
    }
    let hasMore=true;
    if(offset==5){
        hasMore=fish.hasMore=false;
    }
    res.json({list:fishList,hasMore});
});

//获取鱼类菜详情页
app.get('/fish/:fishId',function (req, res) {
    let id=req.params.fishId;
    console.log(id);
    let item=fish.list.find(item=>parseFloat(id)===item.fishId);
    res.send(item);
});

//导入下酒菜列表
app.get('/bearFood',function (req, res) {
    let {offset,limit}=req.query;
    let bearList=[];
    for (let i = parseFloat(offset); i < parseFloat(limit)+parseFloat(offset); i++) {
        bearList.push(bearFood.list[i]);
    }
    let hasMore=true;
    if(offset==5){
        hasMore=bearFood.hasMore=false;
    }
    res.json({list:bearList,hasMore});
});

//获取下酒菜类菜详情页
app.get('/bearFood/:bearId',function (req, res) {
    let id=req.params.bearId;
    console.log(id);
    let item=bearFood.list.find(item=>parseFloat(id)===item.bearId);
    res.send(item);
});

//导入素菜列表
app.get('/vegetableDish',function (req, res) {
    let {offset,limit}=req.query;
    let vegetableList=[];
    for (let i = parseFloat(offset); i < parseFloat(limit)+parseFloat(offset); i++) {
        vegetableList.push(vegetableDish.list[i]);
    }
    let hasMore=true;
    if(offset==5){
        hasMore=vegetableDish.hasMore=false;
    }
    res.json({list:vegetableList,hasMore});
});

//获取素类菜详情页
app.get('/vegetableDish/:vegetableId',function (req, res) {
    let id=req.params.vegetableId;
    console.log(id);
    let item=vegetableDish.list.find(item=>parseFloat(id)===item.vegetableId);
    res.send(item);
});

//导入饮品列表
app.get('/dessert',function (req, res) {
    let {offset,limit}=req.query;
    let dessertList=[];
    for (let i = parseFloat(offset); i < parseFloat(limit)+parseFloat(offset); i++) {
        dessertList.push(dessert.list[i]);
    }
    let hasMore=true;
    if(offset==5){
        dessert.hasMore=false;
    }
    res.json({list:dessertList,hasMore});
});

//获取素类菜详情页
app.get('/dessert/:dessertId',function (req, res) {
    let id=req.params.dessertId;
    let item=vegetableDish.list.find(item=>parseFloat(id)===item.dessertId);
    res.send(item);
});


//注册接口
let users=[];
app.post('/sigup',function (req, res) {
    let user=req.body;
    let oldUser=users.find(item=>item.username==user.username);
    if(oldUser){
        res.json({code:1,error:'用户名已经被占用'})
    }else{
        users.push(user);
        res.json({code:0,success:'用户注册成功'});
        //如果成功了客户端要调到登录
    }

});

//登录接口
app.post('/login',function (req, res) {
    //拿到请求体中的内容
    let user=req.body;
    //在注册过的用户数组中找一找有没有对应的用户
    let oldUser=users.find((item)=>item.username==user.username&&item.password==user.password);
    if(oldUser){
        req.session.user=user;//把登录成功对象写入session
        res.json({code:0,success:'恭喜你登录成功'});
    }else{
        res.json({code:1,error:'用户名或密码错误'})
    }
});


//当应用初始化的时候，会向后台发送一个请求，询问当前用户是否登录，如果登录的话则返回登录的用户并存放在仓库里。
app.get('/validate',function(req,res){
    if(req.session.user){
        res.json({code:0,user:req.session.user});
    }else{
        res.json({code:1})
    }
});


const port=8887;
app.listen(port,function () {

});