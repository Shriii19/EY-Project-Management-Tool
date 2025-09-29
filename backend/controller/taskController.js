import Task from "../model/taskModel.js";

// Dummy tasks for when database is not connected
const dummyTasks = [
    {
        _id: "dummy_task_1",
        title: "Complete project documentation",
        description: "Write comprehensive documentation for the EY project management tool",
        priority: "High",
        completed: false,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        createdAt: new Date(),
        owner: "dummy_user_id"
    },
    {
        _id: "dummy_task_2",
        title: "Review code quality",
        description: "Perform code review and ensure best practices are followed",
        priority: "Medium",
        completed: true,
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
        createdAt: new Date(),
        owner: "dummy_user_id"
    },
    {
        _id: "dummy_task_3",
        title: "Setup deployment pipeline",
        description: "Configure CI/CD pipeline for automated deployment",
        priority: "Low",
        completed: false,
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
        createdAt: new Date(),
        owner: "dummy_user_id"
    }
];

// Task creation functionality has been removed

//Get All Tasks For Logged In User - authentication removed
export const getTasks = async (req,res)=>{
    try {
        // Try to get tasks from database first
        const tasks = await Task.find({owner: 'dummy_user_id'}).sort({createdAt:-1});
        res.json({success:true,tasks});
    } catch (err) {
        // If database is not connected, return dummy tasks
        console.log('Database not connected, using dummy data:', err.message);
        res.json({success:true, tasks: dummyTasks});
    }
}

// Get Single Tasks By ID (must belong to that particular user) - authentication removed
export const getTaskById = async (req,res) => {
    try{
        const task = await Task.findOne({_id:req.params.id, owner:'dummy_user_id'});
        if(!task) return res.status(404).json({success:false,message:'Task Not Found'})
        res.json({success:true,task});
    }catch(err){
        // If database is not connected, try to find in dummy tasks
        console.log('Database not connected, checking dummy data:', err.message);
        const task = dummyTasks.find(t => t._id === req.params.id);
        if(!task) return res.status(404).json({success:false,message:'Task Not Found'})
        res.json({success:true,task});
    }
}

//Update A Task - authentication removed
export const updateTask = async (req,res) =>{
    try{
        const data = {...req.body}
        if(data.completed !== undefined){
            data.completed = data.completed ==='Yes' || data.completed === true;
        }
        const updated = await Task.findOneAndUpdate(
            {_id:req.params.id, owner:'dummy_user_id'},
            data,
            {new:true, runValidators:true}
        );

        if(!updated) return res.status(400).json({success:false,message:'Task Not Found Or Not Yours'})
        res.json({success:true,task:updated})
    }
    catch(err){
        // If database is not connected, simulate update on dummy data
        console.log('Database not connected, simulating update:', err.message);
        const taskIndex = dummyTasks.findIndex(t => t._id === req.params.id);
        if(taskIndex === -1) return res.status(404).json({success:false,message:'Task Not Found'})
        
        const data = {...req.body}
        if(data.completed !== undefined){
            data.completed = data.completed ==='Yes' || data.completed === true;
        }
        
        // Update the dummy task
        dummyTasks[taskIndex] = {...dummyTasks[taskIndex], ...data};
        res.json({success:true,task:dummyTasks[taskIndex]})
    }
}

//DELETE A TASK - authentication removed
export const deleteTask = async(req,res)=>{
    try{
        const deleted = await Task.findOneAndDelete({_id:req.params.id,owner: 'dummy_user_id'});
        if(!deleted) return res.status(404).json({success:false,message:"tasks not found or not yours"})
        res.json({success:true,message:"task Deleted"});
    }catch(err){
        // If database is not connected, simulate delete on dummy data
        console.log('Database not connected, simulating delete:', err.message);
        const taskIndex = dummyTasks.findIndex(t => t._id === req.params.id);
        if(taskIndex === -1) return res.status(404).json({success:false,message:"tasks not found or not yours"})
        
        // Remove from dummy tasks
        dummyTasks.splice(taskIndex, 1);
        res.json({success:true,message:"task Deleted"});
    }
}
