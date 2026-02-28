import Task from "../model/taskModel.js";

// Dummy tasks for when database is not connected
const dummyTasks = [
    {
        _id: "dummy_task_1",
        title: "Complete project documentation",
        description: "Write comprehensive documentation for the EY project management tool",
        priority: "High",
        status: "To Do",
        completed: false,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(),
        owner: "dummy_user_id"
    },
    {
        _id: "dummy_task_2",
        title: "Review code quality",
        description: "Perform code review and ensure best practices are followed",
        priority: "Medium",
        status: "Done",
        completed: true,
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(),
        owner: "dummy_user_id"
    },
    {
        _id: "dummy_task_3",
        title: "Setup deployment pipeline",
        description: "Configure CI/CD pipeline for automated deployment",
        priority: "Low",
        status: "In Progress",
        completed: false,
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(),
        owner: "dummy_user_id"
    }
];

// Create a new task
export const createTask = async (req, res) => {
    try {
        const { title, description, priority, dueDate, status, tags } = req.body;

        if (!title || title.trim().length === 0) {
            return res.status(400).json({ success: false, message: 'Title is required' });
        }

        const task = new Task({
            title: title.trim(),
            description: description || '',
            priority: priority || 'Low',
            status: status || 'To Do',
            dueDate: dueDate || undefined,
            tags: tags || [],
            // Use a placeholder ObjectId so the demo works without real user auth
            owner: '000000000000000000000000',
            completed: false,
        });

        await task.save();
        res.status(201).json({ success: true, message: 'Task created successfully', task });
    } catch (err) {
        // Fall back to in-memory dummy storage when DB is unavailable
        console.log('Database not connected, creating task in dummy data:', err.message);
        const { title, description, priority, dueDate, status, tags } = req.body;

        if (!title || title.trim().length === 0) {
            return res.status(400).json({ success: false, message: 'Title is required' });
        }

        const newTask = {
            _id: `dummy_task_${Date.now()}`,
            title: title.trim(),
            description: description || '',
            priority: priority || 'Low',
            status: status || 'To Do',
            dueDate: dueDate ? new Date(dueDate).toISOString() : null,
            tags: tags || [],
            completed: false,
            createdAt: new Date(),
            owner: 'dummy_user_id',
        };

        dummyTasks.push(newTask);
        res.status(201).json({ success: true, message: 'Task created successfully', task: newTask });
    }
};

//Get All Tasks For Logged In User - authentication removed
export const getTasks = async (req,res)=>{
    try {
        // Try to get tasks from database first
        const tasks = await Task.find({owner: 'dummy_user_id'}).sort({createdAt:-1});
        res.json({success:true, tasks, count: tasks.length});
    } catch (err) {
        // If database is not connected, return dummy tasks
        console.log('Database not connected, using dummy data:', err.message);
        res.json({success:true, tasks: dummyTasks, count: dummyTasks.length, fallback: true});
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
        if(!deleted) return res.status(404).json({success:false,message:"Task not found or not yours"})
        res.json({success:true,message:"Task deleted successfully"});
    }catch(err){
        // If database is not connected, simulate delete on dummy data
        console.log('Database not connected, simulating delete:', err.message);
        const taskIndex = dummyTasks.findIndex(t => t._id === req.params.id);
        if(taskIndex === -1) return res.status(404).json({success:false,message:"Task not found or not yours"})
        
        // Remove from dummy tasks
        dummyTasks.splice(taskIndex, 1);
        res.json({success:true,message:"Task deleted successfully"});
    }
}
