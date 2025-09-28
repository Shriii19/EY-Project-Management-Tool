import Task from "../model/taskModel.js";

// Task creation functionality has been removed

//Get All Tasks For Logged In User

export const getTasks = async (req,res)=>{
    try {
        const tasks = await Task.find({owner: req.user.id}).sort({createdAt:-1});
        res.json({success:true,tasks});
    } catch (err) {
        res.status(500).json({success:false,message:err.message})
    }
}

// Get Single Tasks By ID (mus belong to that particular user)
export const getTaskById = async (req,res) => {
    try{
        const task = await Task.findOne({_id:req.params.id, owner:req.user.id});
        if(!task) return res.status(404).json({success:false,message:'Task Not Found'})
            res.json({success:true,task});
    }catch(err){
        res.status(500).json({success:false,message:err.message})
    }
}

//Update A Task
export const updateTask = async (req,res) =>{
    try{
        const data = {...req.body}
        if(data.completed !== undefined){
            data.completed = data.completed ==='Yes' || data.completed === true;
        }
        const updated = await Task.findOneAndUpdate(
            {_id:req.params.id, owner:req.user.id},
            data,
            {new:true, runValidators:true}
        );

        if(!updated) return res.status(400).json({success:false,message:'Task Not Found Or Not Yours'})
            res.json({success:true,task:updated})
        }
    catch(err){
        res.status(400).json({success:false,message:err.message})
    }
}

//DELETE A TASK 
export const deleteTask = async(req,res)=>{
    try{
        const deleted = await Task.findOneAndDelete({_id:req.params.id,owner: req.user.id});
        if(!deleted) return res.status(404).json({success:false,message:"tasks not found or not yours"})
        res.json({success:true,message:"task Deleted"});
    }catch(err){
        res.status(500).json({success:false,message:err.message})
    }
}
