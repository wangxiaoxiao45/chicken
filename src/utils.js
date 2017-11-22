import { Modal } from 'antd-mobile';
const alert = Modal.alert;
/**
 * @param url  压缩图片的url地址
 * @param percent  压缩比例 0~1
 * @param callback  回调函数
 */

export function compressImage (url,percent,callback){
    let cvs = document.createElement('canvas');
    let ctx = cvs.getContext('2d');
    let img = new window.Image();
    img.src = url;
    img.onload = () => {
        cvs.width = img.width;
        cvs.height = img.height;
        setTimeout(() => {
            ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
            const newImageData = cvs.toDataURL('image/jpeg', percent);
            newImageData&&callback(newImageData)
        }, 0);
    }
}



//弹出提示
export function showAlert(del,val){
    const alertInstance = alert('', val, [
        { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
        { text: '确定', onPress: () => del&&del() },
    ]);
    setTimeout(() => {
        console.log('auto close');
        alertInstance.close();
    }, 500000);
};

//上拉刷新
export function downRefresh(element,callback){
    element.addEventListener('touchstart',touchStart);
    let startY;//开始触摸的纵坐标
    let distance;//移动的距离
    let initTop = element.offsetTop;
    function touchStart(event){
        //只有当此元素的距离顶部的高度等于它的初始距离的话，并且没有滚动的话
        if(element.offsetTop == initTop && element.scrollTop ==0){
            startY = event.targetTouches[0].pageY;//初始值
            element.addEventListener('touchmove',touchMove);
            element.addEventListener('touchend',touchEnd);
        }
        function touchMove(e){
            let pageY = e.targetTouches[0].pageY;
            if(pageY>startY){//新的点的纵坐标大于起始点的纵坐标表示下拉
                distance = pageY - startY;
                element.style.top = initTop+distance+'px';
            }else{//如果上拉的话不处理，移除监听
                element.removeEventListener('touchmove',touchMove);
                element.removeEventListener('touchend',touchEnd);
            }
        }
        function touchEnd(e){
            element.removeEventListener('touchmove',touchMove);
            element.removeEventListener('touchend',touchEnd);
            let timerId = setInterval(function(){
                //如果说当前的距离已经小于等于初始的值了
                if(element.offsetTop<=initTop){
                    element.style.top = initTop+'px';
                    clearInterval(timerId);//清除定时器
                }else{//让top值减1
                    element.style.top = element.offsetTop - 3 +'px';
                }
            },1);
            if(distance>20){
                callback();
            }
        }
    }
}

