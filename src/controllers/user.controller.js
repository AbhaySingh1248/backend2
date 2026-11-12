import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse,} from "../utils/ApiResponse.js"


const registerUser = asyncHandler(async (req ,res)=>{

    //console.log("REQ BODY:", req.body);
   // console.log("REQ FILES:", req.files);
    // step1 get user details from frontend
    // validation if data correct , not empty ...
    // check if user already exists ?? by  username &email

    //avatar is required so check for avatar and images too
    // if available then upload to cloudinary
    //create user object , create entry in db
    //remove password and refreshtokein field in token
    // check for user creation
    //return res!!!!  thats why we removed pass

    //user details from frontend , then destructurei it and store!!
    const {fullName , username , email,password}=req.body
    //console.log("Checking for existing user with:", { username, email });
    //console.log("email:",email)

    // if(fullName==""){
    //     throw new ApiError(400,"fullname is required")
    // }
//good method for multiple ifs
    if(
        [fullName,email,username,password].some((field)=>field?.trim()==="")
        //yaha agar ek v field empty return kiya mtlb khaaali tha and false return!!!!

    ){
throw new ApiError(400,"all fields are not filled")
    }

    const existedError = await User.findOne({
        $or: [{username},{email}]
    })

    if(existedError){
        throw new ApiError(409,"user with email or username already existed")
    }
    
   const avatarLocalPath=  req.files?.avatar[0]?.path;
  // const coverImageLocalPath= req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if(req.files && Array.isArray(req.files.coverImage)  && req.files.coverImage.length >0){
       coverImageLocalPath=req.files.coverImage[0].path
  }

   //check if avatar aaya or not ??

if(!avatarLocalPath)
    throw new ApiError(400,"avatar file is required");


//})
// now upload them to cloudinary !! , code already written that waas the benefit of doing it earlier
// since it is  time taking need to use await !!! 
// aage ka code jana hi nhi hai jb tk ye not upload !! so need to wait 
 const avatar = await uploadOnCloudinary(avatarLocalPath)
const coverImage = await uploadOnCloudinary(coverImageLocalPath)

if(!avatar){
    throw new ApiError(400 , "avatar is necessary")
}

// now when everything is done properly so make an object of user and enter in dattabase
const user = await User.create({
    fullName,
    avatar:avatar.url,
    coverImage : coverImage?.url ||"",//since we didnt checked for it earlier 
    email,
    password,
    username:username.toLowerCase()

})

const createdUser = await User.findById(user._id).select(
"-password -refreshToken"
) // yaha wo likhte jo ni chiye because yaha automatically all selected 

// to check if user creted or not 

if(!createdUser){
    throw new ApiError(500,"something went wrong while registering the user")
}

// now for sending api response we need help of  api reasponse function

return res.status(201).json(
    new ApiResponse(200 , createdUser, "user registered successfully")
)

})



export {registerUser}