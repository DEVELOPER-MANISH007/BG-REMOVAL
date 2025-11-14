//todo to remove the background from the image we use clipdrop api which is a paid api so we will use a free api for now
//! we will use the api key from the env file

import axios from 'axios'
import fs from 'fs'
import formData from 'form-data'
import userModel from '../Models/UserModel.js'

//controller function to remove bg from image
const removeBgImage = async(req,res)=>{
try {
    const clerkId = req.clerkId
    if(!clerkId){
        return res.json({success:false,message:"Clerk user id missing"})
    }
    
    const user = await userModel.findOne({clerkId})
    if(!user){
        return res.json({success:false,message:"User not found"})
    }
    
    if(user.creditBalance===0){
        return res.json({success:false,message:"not Credit Balance",creditBalance:user.creditBalance})
    }
    
    const imagePath = req.file.path;
    //reading the image file
    const imageFile = fs.createReadStream(imagePath)
    const formDataInstance = new formData()
    formDataInstance.append('image_file',imageFile)
    
    const {data} = await axios.post('https://clipdrop-api.co/remove-background/v1',formDataInstance,{
        headers: {
            'x-api-key': process.env.CLIPDROP_API,
            ...formDataInstance.getHeaders()
          },
          responseType: 'arraybuffer'
    })

    const base64Image = Buffer.from(data).toString('base64')
    const resultImage = `data:${req.file.mimetype};base64,${base64Image}`
    await userModel.findByIdAndUpdate(user._id,{creditBalance:user.creditBalance-1})
    res.json({success:true,resultImage, creditBalance:user.creditBalance-1,message:'Background Removed'})
    
} catch (error) {
    console.error("Error removing background:", error.response?.data || error.message)
    res.json({success:false,message:error.response?.data?.message || error.message})   
}
}

export {removeBgImage}