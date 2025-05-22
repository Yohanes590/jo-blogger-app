const express = require("express")
const server = express()
require("dotenv").config()
const Port = process.env.PORT || 5000
const cors = require("cors")
const cloudinary = require("cloudinary").v2
const multer = require("multer")
const PostData = require("./model/blog.model")
const mongoose = require("mongoose")
const AdminModule = require("./model/admin-model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
const cookieParser = require('cookie-parser');
server.use(cookieParser());
const SendOtp = require("./sending-otp")
server.use(cors({
      origin: "https://jo-blogger.vercel.app",
}))

const TempStorage = multer.diskStorage({
      filename: (req,file,cb) => {
            cb(null , file.originalname)
      }
})
const uploadImage = multer({storage:TempStorage})
cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret:process.env.CLOUD_API_SECRET
})
server.post("/adding-post-route",uploadImage.single('image'), (req, res) => {
      try {
            cloudinary.uploader.upload(req.file.path,async (err, result) => {
                  if (err) {
                        res.json({message:"can't post blog",status:400})
                  }
                  const PostDataJson = {
                        PostTitle: req.body.title,
                        postDescription: req.body.description,
                        DateTime: req.body.dateTime,
                        ImagePath: result.secure_url,
                        visibility:req.body.postedType
                  }
                  await PostData.create(PostDataJson)
                  res.json({ message: "success blog post" , status:200})
      
            })
      } catch (error) {
            res.json({message:"something went wrong" , status:500})
      }
})

class SendingOtp {
      constructor() {
        this.OTP = null;
      }
    
      sendingOtpFunction() {
        this.OTP = Math.floor(Math.random() * 900000); 
        SendOtp(process.env.GMAIL, this.OTP); 
        setTimeout(() => {
          this.OTP = null; 
        }, 500000);

      }
    
      getOTP() {
        return this.OTP;
      }
    }
const sendingObj = new SendingOtp()
    

server.post("/access-otp", (req, res) => {
      const UserOtp = req.body.otp;
      if (sendingObj.getOTP() == UserOtp) {
            const UseId = { id: 1, UserInfo: AdminModule }
            const AccessToken = jwt.sign(UseId, process.env.ACCESS_TOKEN_KEY, { expiresIn: "30m" })
            const RefreshToken = jwt.sign(UseId,process.env.REFRESH_TOKEN_KEY,{expiresIn:"7d"})
            res.json({ message: "login success", status: 200 ,AccessToken:AccessToken,RefreshToken:RefreshToken})
      } else {
           res.json({massage:"invalid OTP",status:400}) 
      }
      
})

server.post("/login-admin", async(req, res) => {
     try {
      const AdminLoginInfo = {
            user_email: req.body.userEmail,
            user_password:req.body.userPassword
      }
      const FetchEmail = await AdminModule.findOne({ user_email: AdminLoginInfo.user_email })
      if (FetchEmail) {
            const FetchPassword = FetchEmail.user_password
            const Ismatch = await bcrypt.compare(AdminLoginInfo.user_password, FetchPassword)
            if (Ismatch) {

                  res.json({ message: "Check Your Inbox for Authentication Key", status: 200 })
                  sendingObj.sendingOtpFunction()
            }else{
                  res.json({message:"wrong email or password" , status:400})
            }
      } else {
            res.json({message:"wrong email or password" , status:400})
      }
     } catch (error) {
      res.json({message:"something went" , status:500})
     }
})

server.post("/authenticate-user", (req,res) => {
      try {
            const AccessKey = req.body.accessToken
            const RefreshKey = req.body.refreshToken
            jwt.verify(AccessKey, process.env.ACCESS_TOKEN_KEY, (err, decode) => {
                  if (err) {
                        return jwt.verify(RefreshKey, process.env.REFRESH_TOKEN_KEY, (err, decode) => {
                              if (err) {
                               return res.json({message:"invalid user",status:400})
                                    
                              }
                             res.json({message:"verified success",status:200})
                        })
                  }
                 res.json({message:"verified success",status:200})
            })
      } catch (error) {
            res.json({message:error.message,status:500})
      }
})


server.post("/post-fetching", (req, res) => {
      try {
            const AccessKey = req.body.accessToken
            const RefreshKey = req.body.refreshToken
            jwt.verify(AccessKey, process.env.ACCESS_TOKEN_KEY,async (err, decode) => {
                  if (err) {
                        return jwt.verify(RefreshKey, process.env.REFRESH_TOKEN_KEY, async(err, decode) => {
                              if (err) {
                               return res.json({message:"invalid user",status:400})
                                    
                              }
                              const allPost = await PostData.find({})
                           res.json(allPost)
                        })
                  }
                  const allPost = await PostData.find({})
                  res.json(allPost)
   
            })
      } catch (error) {
            res.json({message:error.message,status:500})
      }
})

server.post("/deleting-post", async(req, res) => {
      const AccessKey = req.body.accessToken
      const RefreshKey = req.body.refreshToken
      jwt.verify(AccessKey, process.env.ACCESS_TOKEN_KEY, async(err, decode) => {
            if (err) {
                  return jwt.verify(RefreshKey, process.env.REFRESH_TOKEN_KEY, async(err, decode) => {
                        if (err) {
                         return res.json({message:"invalid user",status:400})
                              
                        }
                        const postId = req.body.Id;
                        const findDeletedPost = await PostData.findOne({ _id: postId })
                        const splPath = findDeletedPost.ImagePath.split("/")
                        const GetRealPath = splPath.length - 1
                        const RemoveEx = splPath[GetRealPath].split(".")[0]
                        cloudinary.uploader.destroy(RemoveEx, async(err, result) => {
                              if (err) {
                                    return res.json({message:"something went wrong" , status:500})
                              }
                              await PostData.findOneAndDelete({_id:postId})
                              res.json({message:"deleted success" , status:200})
                        })
                  })
            }
            const postId = req.body.Id;
            const findDeletedPost = await PostData.findOne({ _id: postId })
            const splPath = findDeletedPost.ImagePath.split("/")
            const GetRealPath = splPath.length - 1
            const RemoveEx = splPath[GetRealPath].split(".")[0]
            cloudinary.uploader.destroy(RemoveEx, async(err, result) => {
                  if (err) {
                        return res.json({message:"something went wrong" , status:500})
                  }
                  await PostData.findOneAndDelete({_id:postId})
                  res.json({message:"deleted success" , status:200})
            })

      })

})


server.post("/counting-post", async(req, res) => {
      try {
            const AccessKey = req.body.accessToken;
            const RefreshKey = req.body.refreshToken;
            const allPost = await PostData.find({});
            const fetchingPublic = allPost.filter(post => post.visibility === "public");
            const fetchingPrivate = allPost.filter(post => post.visibility === "private");
            
            jwt.verify(AccessKey, process.env.ACCESS_TOKEN_KEY, async (err, decode) => {
              if (err) {
                return jwt.verify(RefreshKey, process.env.REFRESH_TOKEN_KEY, async (err, decode) => {
                  if (err) {
                    return res.json({ message: "invalid user", status: 400 });
                  }
            
                  res.json({
                    allPost: allPost.length,
                    public: fetchingPublic.length,
                    private: fetchingPrivate.length,
                    status: 200
                  });
                });
              }
            
              res.json({
                allPost: allPost.length,
                public: fetchingPublic.length,
                private: fetchingPrivate.length,
                status: 200
              });
            });
            
      } catch (error) {
            res.json({message:error.message,status:500})
      }
})


server.post("/public-post", async(req,res) => {
      try {
            const findingData = await PostData.find({})
            const pickPublic = findingData.find(publicData => publicData.visibility === 'public')
            res.json([pickPublic])
      } catch (error) {
            res.json({message:"error",status:500})
      }
})

mongoose.connect(process.env.DB_CONNECTION).then(() => {
      console.log("Db Connected Success")
}).catch((error) => {
      console.log({error:error.message})
})


server.listen(Port,()=> {
      console.log(`api started of ${Port}`)
})
