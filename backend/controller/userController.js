import User from "../model/userModel.js";
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';
const TOKEN_EXPIRES='24h';

// Token creation functionality has been removed



// User registration functionality has been removed

// Login functionality has been removed

// GET CURRENT USER - authentication removed
export async function getCurrentUser(req,res){
    try{
        const user=await User.findById('dummy_user_id').select("name email")
        if(!user){
            return res.status(400).json({success:false,message:"User Not Found"})
        }
        res.json({success:true,user})
    }catch(err){
        console.log(err);
        res.status(500).json({success:false,message:'Server Error'})
    }
}

//UPDATE USER PROFILE - authentication removed

export async function updateProfile(req,res){
    const {name,email} =req.body;

    if(!name || !email || !validator){
        return res.status(400).json({success:false,message:"Valid name and Email required"})
    }

    try{
        const exists= await User.findOne({email, _id:{$ne:'dummy_user_id'}});
        if(exists){
            return res.status(409).json({success:false,message:"email already used by another account"})
        }
        const user = await User.findByIdAndUpdate(
            'dummy_user_id',
            {name,email},
            {new:true,runValidators:true, select:"name email"}
        )
        res.json({success:true,user})
    }catch(err){
        console.log(err);
        res.status(500).json({success:false,message:'Server Error'})
    }
}

//Change Password Function - authentication removed

export async function updatePassword(req,res){
    const {currentPassword,newPassword} = req.body;
    if(!currentPassword || !newPassword || newPassword.length<8){
        return res.json(400).json({success:false,message:"Password invalid or too Short"})
    }
    try{
        const user = await User.findById('dummy_user_id').select("password")
        if(!user){
            return res.status(404).json({success:false,message:"User Not Found"})
        }
        const match = await bcrypt.compare(currentPassword,user.password);
        if(!match){
            return res.status(401).json({success:false,message:"current password invalid"})
        }
        user.password=await bcrypt.hash(newPassword,10);
        await user.save();
        res.json({success:true,message:"password changed"})
    }catch(err){
        console.log(err);
        res.json({success:false,message:'Server Error'})
    }
}