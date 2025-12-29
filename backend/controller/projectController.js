import Project from '../model/projectModel.js';

// Get all projects
export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find()
            .populate('teamMembers', 'name email')
            .populate('tasks')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: projects
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({
            success: false,
            error: {
                message: 'Failed to fetch projects',
                details: error.message
            }
        });
    }
};

// Get single project by ID
export const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id)
            .populate('teamMembers', 'name email')
            .populate('tasks');

        if (!project) {
            return res.status(404).json({
                success: false,
                error: {
                    message: 'Project not found'
                }
            });
        }

        res.status(200).json({
            success: true,
            data: project
        });
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({
            success: false,
            error: {
                message: 'Failed to fetch project',
                details: error.message
            }
        });
    }
};

// Create new project
export const createProject = async (req, res) => {
    try {
        const { name, description, status, startDate, endDate, priority, teamMembers } = req.body;

        const project = new Project({
            name,
            description,
            status,
            startDate,
            endDate,
            priority,
            teamMembers: teamMembers || []
        });

        await project.save();

        const populatedProject = await Project.findById(project._id)
            .populate('teamMembers', 'name email');

        res.status(201).json({
            success: true,
            message: 'Project created successfully',
            data: populatedProject
        });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({
            success: false,
            error: {
                message: 'Failed to create project',
                details: error.message
            }
        });
    }
};

// Update project
export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const project = await Project.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        )
            .populate('teamMembers', 'name email')
            .populate('tasks');

        if (!project) {
            return res.status(404).json({
                success: false,
                error: {
                    message: 'Project not found'
                }
            });
        }

        res.status(200).json({
            success: true,
            message: 'Project updated successfully',
            data: project
        });
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({
            success: false,
            error: {
                message: 'Failed to update project',
                details: error.message
            }
        });
    }
};

// Delete project
export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findByIdAndDelete(id);

        if (!project) {
            return res.status(404).json({
                success: false,
                error: {
                    message: 'Project not found'
                }
            });
        }

        res.status(200).json({
            success: true,
            message: 'Project deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({
            success: false,
            error: {
                message: 'Failed to delete project',
                details: error.message
            }
        });
    }
};
