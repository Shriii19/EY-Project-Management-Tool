import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import {connectDB} from './config/db.js'
import userRouter from './routes/userRoute.js'
import taskRouter from './routes/taskRoute.js'

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
app.use("/api/user",userRouter);
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
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error',
            status: err.status || 500
        }
    });
});

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`);
})