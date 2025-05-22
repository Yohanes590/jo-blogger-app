const mongoose = require("mongoose")
const AdminSchema = mongoose.Schema({
      user_email: {
            type: String,
            required: true
      },
      user_password: {
            type: String,
            required: true
      }
})

const AdminModule = mongoose.model("admin-username-password", AdminSchema)
module.exports = AdminModule