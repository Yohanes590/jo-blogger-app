const mongoose = require("mongoose")
const ModelSchema = mongoose.Schema({
      PostTitle: {
            type: String,
            required:true
      },
      postDescription: {
            type: String,
            required:true
      },
      DateTime: {
            type: String,
            required:true,
      },
      ImagePath:{
            type: String,
            required:true,
      },
      visibility: {
            type: String,
            required:true
      }
})

const PostData = mongoose.model("PostData", ModelSchema)
module.exports = PostData