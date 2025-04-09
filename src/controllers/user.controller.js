import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError }  from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import { uploadOncloudinary }  from "../utils/cloudinary.js";   
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req , res) => {
    //get user detail from frontend
    //valdation of the (not empty)
    //check if user already existts : username or email
    //check for images and check for avatar
    //upload them to cloudinary , avatar check
    //create user object -create entry in db
    //remove password and refresh token field from response 
    //check for user creation
    //return res 

    const {fullname, email , username , password } = req.body ;
    console.log("email:" , email);
    
    if(
        [fullname,email , username , password].some((field)=> field.trim() === "")){         // advance verison of checking all the fields rather than checking single one or each one repeatedly
            throw new ApiError(400 , "All fields are required")
    }

    const existedUser = User.findOne({
        $or : [{username} , {email}]            //$ used to check for all the fields at a time
    })

    if(existedUser){
        throw new ApiError(409, "User with this email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path ;
    const coverImagelocalpath =  req.files?.coverImage[0]?.path ;

    if(!avatarLocalPath){
        throw new ApiError(400 , "Avatar is Required");
    }


    const avatar = await uploadOncloudinary(avatarLocalPath) ;
    const coverImage = await uploadOncloudinary(coverImagelocalpath);

    if(!avatar){
        throw new ApiError(400,"Avatar file upload failed")
    }
    

    const user = await User.create({
        fullname ,
        avatar : avatar.url ,
        coverImage : coverImage?.url || "",
        email ,
        password ,
        username : username.toLowerCase()

    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )  //ye password or refresh token ko response se hata dega - sign

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while creating user")
    }

    return res.status(201).json(
        new ApiResponse(201,createdUser , "User registered successfully")
    )
    
    

})

export {
    registerUser,
};