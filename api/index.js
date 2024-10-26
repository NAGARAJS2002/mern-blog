import express from "express";
import mongoose from "mongoose";
import env from "dotenv";
import authRouter from "./routes/authRoute.js"
env.config()
const app = express();
const PORT = 3000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URL).then(() =>{
    console.log('mongodb is connected')
}).catch((error) => {
console.log(error);

})

app.listen(PORT,() =>{
    console.log(`server is running on port ${PORT}`);
    
});


app.use('/api/auth',authRouter);

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({

        success: false,
        statusCode,
        message,
    }
      
    )
})