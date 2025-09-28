import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import {connectDB} from './config/db.js'
import userRouter from './routes/userRoute.js'
import taskRouter from './routes/taskRoute.js'

const app = express();
const port = process.env.PORT || 4000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const allowedOrigins = ['https://project-management-tool-murex.vercel.app/']; // REPLACE with your actual Vercel/Netlify URL
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

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true); 
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true // Important for sending cookies/sessions
}));