import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Click 'View API Keys' above to copy your Cloud name
    api_key: process.env.CLOUDINARY_API_KEY, // Click 'View API Keys' above to copy your API key
    api_secret: process.env.CLOUDINARY_API_SECRET   // Click 'View API Keys' above to copy your API secret
});


const uploadOncloudinary = async (localfilepath) => {
    try {
        if(! localfilepath)return null;
        const response = cloudinary.uploader.upload(localfilepath,{
            resource_type: 'auto',
        });
        console.log("File has been uploaded to cloudinary successfully : ",response.url);
        return response ;
    } catch (error) {
        fs.unlinksync(localfilepath);  //remove the locally saved file as the upload failed
        return null ;
    }
}

const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           },
           function(error,result){ console.log(result); });

export {uploadOncloudinary};