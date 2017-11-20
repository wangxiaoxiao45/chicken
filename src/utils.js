//压缩图片
export function compressImage (url,callback){
    let cvs = document.createElement('canvas');
    let ctx = cvs.getContext('2d');
    let img = new window.Image();
    img.src = url;
    img.onload = () => {
        cvs.width = img.width;
        cvs.height = img.height;
        setTimeout(() => {
            ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
            const newImageData = cvs.toDataURL('image/jpeg', 0.8);
            newImageData&&callback(newImageData)
        }, 0);
    }
}