import User from "../model/userModel.js";
import validator from 'validator'

// Authentication completely removed - this is a demo app

// GET CURRENT USER
export async function getCurrentUser(req,res){
    try{
        const user = {
            _id: 'guest_user',
            name: 'Guest User',
            email: 'guest@taskflow.app'
        }
        res.json({success:true,user})
    }catch(err){
        console.log(err);
        res.status(500).json({success:false,message:'Server Error'})
    }
}

//UPDATE USER PROFILE
export async function updateProfile(req,res){
    const {name,email} =req.body;

    if(!name || !email || !validator.isEmail(email)){
        return res.status(400).json({success:false,message:"Valid name and Email required"})
    }

    try{
        const user = {
            _id: 'guest_user',
            name: name,
            email: email
        }
        res.json({success:true,user, message: 'Profile updated successfully'})
    }catch(err){
        console.log(err);
        res.status(500).json({success:false,message:'Server Error'})
    }
}