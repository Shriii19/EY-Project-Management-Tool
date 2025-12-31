import mongoose from "mongoose";

// User model simplified - authentication removed
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
})

const userModel=mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;