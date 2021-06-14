export const checkImage = (file) => {
    var err = '';
    if(!file) return err = 'file does not exist'

    if(file.type!== 'image/jpeg' && file.type!=='image/png' )
    return  err = "image format is incorrect"

    if(file.size > 1024*1024)
    return err = 'image should be less than 1 Mb'

    return err;
}

export const imageUpload = async images =>{
    const imgArr = []
    for(const item of images)
    {
    const formData = new FormData(); 
    formData.append('file',item)
    formData.append('upload_preset','geabltpl')
    formData.append('cloud_name','dymzmaavj')
    const res =  await fetch('https://api.cloudinary.com/v1_1/dymzmaavj/image/upload',{
        method:'POST',
        body : formData
    })
   const data = await res.json();
   console.log(data)
   imgArr.push({public_id:data.public_id,url:data.secure_url})
}
console.log(imgArr)
return imgArr
  
} 