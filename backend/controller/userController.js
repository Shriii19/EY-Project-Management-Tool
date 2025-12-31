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
        res.status(500).json({success:false,message:'Server Error', error: err.message})
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
        res.status(500).json({success:false,message:'Server Error', error: err.message})
    }
}

// GET USER STATS
export async function getUserStats(req,res){
    try{
        // Mock stats data - in real app, calculate from database
        const stats = {
            totalProjects: 12,
            completedProjects: 8,
            activeTasks: 24,
            completedTasks: 156,
            hoursLogged: 320,
            efficiency: 92
        }
        res.json({success:true, stats})
    }catch(err){
        res.status(500).json({success:false,message:'Server Error', error: err.message})
    }
}

// GET USER ACTIVITY
export async function getUserActivity(req,res){
    try{
        const limit = parseInt(req.query.limit) || 10;
        // Mock activity data - in real app, fetch from database
        const activities = [
            { 
                id: 1,
                action: 'Completed task', 
                detail: 'Update API documentation', 
                time: '2 hours ago', 
                type: 'task_completed',
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
            },
            { 
                id: 2,
                action: 'Created project', 
                detail: 'Mobile App Redesign', 
                time: '5 hours ago', 
                type: 'project_created',
                timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000)
            },
            { 
                id: 3,
                action: 'Commented on', 
                detail: 'Backend Integration task', 
                time: '1 day ago', 
                type: 'comment',
                timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000)
            },
            { 
                id: 4,
                action: 'Updated milestone', 
                detail: 'Q1 Release Planning', 
                time: '2 days ago', 
                type: 'milestone_updated',
                timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
            }
        ].slice(0, limit);
        
        res.json({success:true, activities})
    }catch(err){
        res.status(500).json({success:false,message:'Server Error', error: err.message})
    }
}