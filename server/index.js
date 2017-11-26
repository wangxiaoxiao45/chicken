const express=require("express");
const bodyParser=require("body-parser");
const fs=require("fs");
const path=require("path");
const session=require("express-session");
const app=new express();


app.use(express.static(path.resolve('./mock')));
app.use(express.static(path.resolve('./img')));


app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'jiami'
}));

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
let indexData=require('./mock/indexData');//首页数据



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


//异步写文件
function writeFileFn(name,data,callback){
    fs.writeFile(name,data,callback);
}

//异步读文件
function readFileFn(name,callback) {
    fs.readFile(name,'utf8',callback);
}

let upImg=null; //存储头像
//上传头像
app.post("/uploadImge",(req,res)=>{
    upImg=req.body;
    if(upImg.upImg){
        res.json({code:0,...upImg});
    }else{
        res.json({code:1});
    }
});
//读取头像
app.get("/getImg",(req,res)=>{
    if(upImg){
        res.json(upImg);
    }
});

//处理base64图片
let reg=/^data:image\/\w+;base64,/;
function changeToJpg(imgData){
    let base64Data=imgData.replace(reg, ""),
        dataBuffer = new Buffer(base64Data, 'base64'),
        name='../img/'+Math.floor(Math.random()*9000000+1000000)+'.jpg';  //生成一个随机数 做图片的名字并存放到img文件夹下

    writeFileFn(name,dataBuffer,(err)=>{
        if(err){
            throw err;
        }
    });

    return name;
}

//获取菜谱 存入数据
app.post("/addmenu",(req,res)=>{
    let mes=req.body;

    //把base64图片转成jpg并保存到step里
    mes.detail.steps=mes.detail.steps.map((item,index)=>{
        let img=item.img;
        item.title=`步骤${index+1}`;
        if(img.length){
            item.img=changeToJpg(img);
        }
        return item;
    });
    //detailImg base64图片转化为jpg
    mes.detail.detailImg=changeToJpg(mes.detail.detailImg);
    mes.titlebg=mes.detail.detailImg;  //共用同一张图片

    //对转化的图片按title排序
    mes.detail.steps.sort(function(a,b){
        return a.title.localeCompare(b.title);
    });
    //插入到对应到菜谱中
    insertMenu(mes);

    readFileFn("./mock/addmenu.json",(err,data)=>{
        if(err) throw err;
        totalAddList(JSON.parse(data),mes,'./mock/addmenu.json');
    });


    res.json({success:"ok"});
});

//写入到个人中心菜谱列表

function totalAddList(oldList,newObj,fileName){
    if(Array.isArray(oldList)){
        newObj.id=oldList.length?Number(oldList[oldList.length-1].id)+1:1;
        newObj.ListId=ListId;
        oldList.push(newObj);
    }else{
        ListId=newObj.id=newObj.ListId=oldList.list.length?oldList.list[oldList.list.length-1].id+1:1;
        oldList.list.push(newObj);
    }

    writeFileFn(fileName,JSON.stringify(oldList),(err)=>{
        if(err){
            throw err;
        }
    })
}


//根据传递的classify选项不同 插入到不同的菜单中
function insertMenu(menuName){
    switch (menuName.classify){
        case '':
        case '家常菜':
            readList(menuName,'./mock/homeDishes.json');
            break;
        case '快手菜':
            readList(menuName,'./mock/fastFood.json');
            break;
        case '下饭菜':
            readList(menuName,'./mock/downMeal.json');
            break;
        case '早餐':
            readList(menuName,'./mock/breakFast.json');
            break;
        case '肉类':
            readList(menuName,'./mock/meat.json');
            break;
        case '鱼类':
            readList(menuName,'./mock/fish.json');
            break;
        case '下酒菜':
            readList(menuName,'./mock/bearFood.json');
            break;
        case '素菜':
            readList(menuName,'./mock/vegetableDish.json');
            break;
        case '饮品':
            readList(menuName,'./mock/dessert.json');
            break;
    }
}

function readList(menuName,url){
    readFileFn(url,function(err,data){
        if(err) throw err;
        data=JSON.parse(data);
        totalAddList(data,menuName,url);
    });
}


//添加的菜谱返回给用户
app.get("/useraddmenu",function(req,res){
    readFileFn('./mock/addmenu.json',function(err,data){
        if(err) return;
        res.json({code:0,data:JSON.parse(data).reverse()});
    });

});

//删除上传的菜单
var ListId=0;
app.post("/deladdlist",(req,res)=>{
    let list=req.body;
    console.log(list);
    readFileFn("./mock/addmenu.json",(err,data)=>{
        if(err){
            throw err;
        }
        let itemList;
        data=JSON.parse(data);

        data=data.filter((item)=>{
            if(list.id===item.id){
                itemList=item;
            }
            return list.id!==item.id;
        });
        if(itemList.detail.detailImg){
             fs.unlinkSync(itemList.detail.detailImg);
                itemList.detail.detailImg="";
             }
             itemList.detail.steps&&itemList.detail.steps.forEach(function(item){

             if(item.img){
                fs.unlinkSync(item.img);
             item.img="";
             }
         });

        writeFileFn("./mock/addmenu.json",JSON.stringify(data),function(err){
            if(err){
                throw err;
            }
            res.json({data:data});
        });
    });

    choicedeleteMenu(list,res);

});

//删除分类中的菜谱
function deleteMenu(fileName,listid){
    readFileFn(fileName,(err,data)=>{
        if(err){
            throw err;
        }
        data=JSON.parse(data);

        data.list=data.list.filter((item)=>listid!=item.ListId);
        writeFileFn(fileName,JSON.stringify(data),function(err){
            if(err) throw err;
        });
    })
}

function choicedeleteMenu(menuName){

    switch (menuName.classify){
        case '':
        case '家常菜':
            deleteMenu("./mock/homeDishes.json",menuName.ListId);
            break;
        case '快手菜':
            deleteMenu("./mock/fastFood.json",menuName.ListId);
            break;
        case '下饭菜':
            deleteMenu("./mock/downMeal.json",menuName.ListId);
            break;
        case '早餐':
            deleteMenu("./mock/breakFast.json",menuName.ListId);
            break;
        case '肉类':
            deleteMenu("./mock/meat.json",menuName.ListId);
            break;
        case '鱼类':
            deleteMenu("./mock/fish.json",menuName.ListId);
            break;
        case '下酒菜':
            deleteMenu("./mock/bearFood.json",menuName.ListId);
            break;
        case '素菜':
            deleteMenu("./mock/vegetableDish.json",menuName.ListId);
            break;
        case '饮品':
            deleteMenu("./mock/dessert.json",menuName.ListId);
            break;
    }
}


//获取个人中心列表点击跳转详情信息
app.post("/useraddmenulist",function(req,res){
    let id=req.body.id;
    readFileFn('./mock/addmenu.json',function(err,data){
        if(err) return;
        let item=JSON.parse(data).filter((cur,index)=>index+1==id);
        res.json({lists:item[0]});
    });
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
    let homeList=[];

    readFileFn('./mock/homeDishes.json',function(err,data){
        data=JSON.parse(data);
        data.list.reverse();
        for (let i = parseFloat(offset); i < parseFloat(limit)+parseFloat(offset); i++) {
            homeList.push(data.list[i]);
        }
        let hasMore=true;
        if(offset==5){
            hasMore=homedishes.hasMore=false;
        }
        res.json({list:homeList,hasMore});
    });
});


//家常菜详情页
app.get('/homedishes/:homeId',function (req, res) {
    let id=req.params.homeId;
    let item=homedishes.list.find(item=>parseFloat(id)===item.homeId);
    res.send(item);
});


//获取快手菜列表
app.get('/fastFood',function (req, res) {
    let {offset,limit}=req.query;
    let fastList=[];
    readFileFn('./mock/fastFood.json',function(err,fastFood) {
        fastFood = JSON.parse(fastFood);
        fastFood.list.reverse();
        for (let i = parseFloat(offset); i < parseFloat(limit) + parseFloat(offset); i++) {
            fastList.push(fastFood.list[i]);
        }
        let hasMore = true;
        if (offset == 5) {
            hasMore = fastFood.hasMore = false;
        }
        res.json({list: fastList, hasMore});
    })
});

//获取快手菜详情页
app.get('/fastFood/:fastId',function (req, res) {
    let id=req.params.fastId;
    let item=fastFood.list.find(item=>parseFloat(id)===item.fastId);
    res.send(item);
});

//获取下饭菜列表
app.get('/downMeal',function (req, res) {
    let {offset,limit}=req.query;
    let downList=[];
    readFileFn('./mock/downMeal.json',function(err,downMeal) {
        downMeal = JSON.parse(downMeal);
        downMeal.list.reverse();
        for (let i = parseFloat(offset); i < parseFloat(limit) + parseFloat(offset); i++) {
            downList.push(downMeal.list[i]);
        }
        let hasMore = true;
        if (offset == 5) {
            hasMore = downMeal.hasMore = false;
        }
        res.json({list: downList, hasMore});
    })
});


//获取下饭菜详情页
app.get('/downMeal/:downId',function (req, res) {
    let id=req.params.downId;
    let item=downMeal.list.find(item=>parseFloat(id)===item.downId);
    res.send(item);
});

//获取早餐列表
app.get('/breakFast',function (req, res) {
    let {offset,limit}=req.query;
    let breakList=[];
    readFileFn('./mock/breakFast.json',function(err,breakFast) {
        breakFast = JSON.parse(breakFast);
        breakFast.list.reverse();
        for (let i = parseFloat(offset); i < parseFloat(limit) + parseFloat(offset); i++) {
            breakList.push(breakFast.list[i]);
        }
        let hasMore = true;
        if (offset == 5) {
            hasMore = breakFast.hasMore = false;
        }
        res.json({list: breakList, hasMore});
    })
});

//获取早餐菜详情页
app.get('/breakFast/:breakId',function (req, res) {
    let id=req.params.downId;
    let item=breakFast.list.find(item=>parseFloat(id)===item.breakId);
    res.send(item);
});

//导入肉类列表
app.get('/meat',function (req, res) {
    let {offset,limit}=req.query;
    let meatList=[];
    readFileFn('./mock/meat.json',function(err,meat) {
        meat = JSON.parse(meat);
        meat.list.reverse();
        for (let i = parseFloat(offset); i < parseFloat(limit) + parseFloat(offset); i++) {
            meatList.push(meat.list[i]);
        }
        let hasMore = true;
        if (offset == 5) {
            hasMore = meat.hasMore = false;
        }
        res.json({list: meatList, hasMore});
    })
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
    readFileFn('./mock/fish.json',function(err,fish) {
        fish = JSON.parse(fish);
        fish.list.reverse();
        for (let i = parseFloat(offset); i < parseFloat(limit) + parseFloat(offset); i++) {
            fishList.push(fish.list[i]);
        }
        let hasMore = true;
        if (offset == 5) {
            hasMore = fish.hasMore = false;
        }
        res.json({list: fishList, hasMore});
    })
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
    readFileFn('./mock/bearFood.json',function(err,bearFood) {
        bearFood = JSON.parse(bearFood);
        bearFood.list.reverse();
        for (let i = parseFloat(offset); i < parseFloat(limit) + parseFloat(offset); i++) {
            bearList.push(bearFood.list[i]);
        }
        let hasMore = true;
        if (offset == 5) {
            hasMore = bearFood.hasMore = false;
        }
        res.json({list: bearList, hasMore});
    })
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
    readFileFn('./mock/vegetableDish.json',function(err,vegetableDish) {
        vegetableDish = JSON.parse(vegetableDish);
        vegetableDish.list.reverse();
        for (let i = parseFloat(offset); i < parseFloat(limit) + parseFloat(offset); i++) {
            vegetableList.push(vegetableDish.list[i]);
        }
        let hasMore = true;
        if (offset == 5) {
            hasMore = vegetableDish.hasMore = false;
        }
        res.json({list: vegetableList, hasMore});
    })
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
    readFileFn('./mock/dessert.json',function(err,dessert) {
        dessert = JSON.parse(dessert);
        dessert.list.reverse();
        for (let i = parseFloat(offset); i < parseFloat(limit) + parseFloat(offset); i++) {
            dessertList.push(dessert.list[i]);
        }
        let hasMore = true;
        if (offset == 5) {
            hasMore=dessert.hasMore = false;
        }
        res.json({list: dessertList, hasMore});
    })
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
        res.json({code:0,success:'用户注册成功',user});
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
        req.session.user=oldUser;//把登录成功对象写入session
        res.json({code:0,success:'恭喜你登录成功',user:{username:oldUser.username,nickname:oldUser.nickname}});
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

//账号退出
app.post("/userquit",function(req,res){
    if(req.body.quit==='ok'){
        res.json({code:0,success:"退出成功"});
        req.session.destroy();
    }
});

const port=8887;
app.listen(port,function () {

});