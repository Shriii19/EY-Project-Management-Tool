import validator from 'validator';

/**
 * Validation Middleware
 * Provides common validation functions for request data
 */

// Validate task creation/update data
export const validateTask = (req, res, next) => {
    const { title, description, priority, status, dueDate, tags } = req.body;

    // Title validation
    if (title !== undefined) {
        if (!title || typeof title !== 'string' || title.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Title is required and must be a non-empty string'
            });
        }
        if (title.length > 200) {
            return res.status(400).json({
                success: false,
                message: 'Title must not exceed 200 characters'
            });
        }
    }

    // Description validation
    if (description !== undefined && typeof description !== 'string') {
        return res.status(400).json({
            success: false,
            message: 'Description must be a string'
        });
    }

    // Priority validation
    if (priority !== undefined) {
        const validPriorities = ['Low', 'Medium', 'High'];
        if (!validPriorities.includes(priority)) {
            return res.status(400).json({
                success: false,
                message: 'Priority must be one of: Low, Medium, High'
            });
        }
    }

    // Status validation
    if (status !== undefined) {
        const validStatuses = ['To Do', 'In Progress', 'In Review', 'Done'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Status must be one of: To Do, In Progress, In Review, Done'
            });
        }
    }

    // Due date validation
    if (dueDate !== undefined) {
        const date = new Date(dueDate);
        if (isNaN(date.getTime())) {
            return res.status(400).json({
                success: false,
                message: 'Invalid due date format'
            });
        }
    }

    // Tags validation
    if (tags !== undefined) {
        if (!Array.isArray(tags)) {
            return res.status(400).json({
                success: false,
                message: 'Tags must be an array'
            });
        }
        if (tags.length > 10) {
            return res.status(400).json({
                success: false,
                message: 'Maximum 10 tags allowed'
            });
        }
        for (const tag of tags) {
            if (typeof tag !== 'string' || tag.length > 50) {
                return res.status(400).json({
                    success: false,
                    message: 'Each tag must be a string with max 50 characters'
                });
            }
        }
    }

    next();
};

// Validate user profile update data
export const validateUserProfile = (req, res, next) => {
    const { name, email } = req.body;

    // Name validation
    if (name !== undefined) {
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Name is required and must be a non-empty string'
            });
        }
        if (name.length < 2 || name.length > 100) {
            return res.status(400).json({
                success: false,
                message: 'Name must be between 2 and 100 characters'
            });
        }
    }

    // Email validation
    if (email !== undefined) {
        if (!email || !validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Valid email is required'
            });
        }
    }

    next();
};

// Validate MongoDB ObjectId
export const validateObjectId = (paramName = 'id') => {
    return (req, res, next) => {
        const id = req.params[paramName];
        
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: `Invalid ${paramName} format`
            });
        }

        next();
    };
};

// Rate limiting helper (basic implementation)
const requestCounts = new Map();

export const basicRateLimit = (maxRequests = 100, windowMs = 60000) => {
    return (req, res, next) => {
        const ip = req.ip || req.connection.remoteAddress;
        const now = Date.now();
        const windowStart = now - windowMs;

        // Clean up old entries
        if (requestCounts.size > 10000) {
            requestCounts.clear();
        }

        // Get or create request log for this IP
        if (!requestCounts.has(ip)) {
            requestCounts.set(ip, []);
        }

        const requests = requestCounts.get(ip);
        
        // Filter out requests outside the current window
        const recentRequests = requests.filter(timestamp => timestamp > windowStart);
        
        if (recentRequests.length >= maxRequests) {
            return res.status(429).json({
                success: false,
                message: 'Too many requests, please try again later'
            });
        }

        // Add current request
        recentRequests.push(now);
        requestCounts.set(ip, recentRequests);

        next();
    };
};
