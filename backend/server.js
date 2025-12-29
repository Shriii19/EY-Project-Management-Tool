import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import {connectDB} from './config/db.js'
import userRouter from './routes/userRoute.js'
import taskRouter from './routes/taskRoute.js'
import projectRouter from './routes/projectRoute.js'

const app = express();
const port = process.env.PORT || 4000;

// MIDDLEWARE - CORS setup for development
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:5173',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:5173',
        'https://project-management-tool-murex.vercel.app'
    ],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//DB connect
connectDB();

//Routes
app.use("/api/user",userRouter);;
app.use("/api/projects",projectRouter)
app.use("/api/tasks",taskRouter)

app.get('/',(req,res)=>{
    res.send('API Working')
})

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    const statusCode = err.status || err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        error: {
            message: err.message || 'Internal Server Error',
            status: statusCode,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        }
    });
});

// 404 handler for undefined routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: {
            message: 'Route not found',
            status: 404
        }
    });
});

const server = app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
    });
});