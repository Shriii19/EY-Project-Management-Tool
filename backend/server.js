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

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`);
})