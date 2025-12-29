import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Project name is required'],
        trim: true
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    status: {
        type: String,
        enum: ['Active', 'On Hold', 'Completed'],
        default: 'Active'
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    teamMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    }
}, {
    timestamps: true
});

// Virtual for completed tasks count
projectSchema.virtual('completedTasks').get(function() {
    return this.tasks ? this.tasks.filter(task => task.status === 'Completed').length : 0;
});

// Virtual for total tasks count
projectSchema.virtual('totalTasks').get(function() {
    return this.tasks ? this.tasks.length : 0;
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
