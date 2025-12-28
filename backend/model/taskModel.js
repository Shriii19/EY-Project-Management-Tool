import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:" "
    },
    priority:{
        type:String,
        enum:['Low','Medium','High'],
        default:'Low'
    },
    status:{
        type:String,
        enum:['To Do','In Progress','In Review','Done'],
        default:'To Do'
    },
    dueDate:{
        type:Date,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    tags:{
        type:[String],
        default:[]
    },
    completed:{
        type:Boolean,
        default:false
    },
    completedAt:{
        type:Date
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
}, {
    timestamps: true
})

const Task = mongoose.models.Task || mongoose.model('Task',taskSchema);

export default Task;