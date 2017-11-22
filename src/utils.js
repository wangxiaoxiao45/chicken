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