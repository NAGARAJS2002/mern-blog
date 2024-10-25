import express from "express";
import mongoose from "mongoose";
import env from "dotenv";
env.config()
const app = express();
const PORT = 3000;

mongoose.connect(process.env.MONGODB_URL).then(() =>{
    console.log('mongodb is connected')
}).catch((error) => {
console.log(error);

})

app.listen(PORT,() =>{
    console.log(`server is running on port ${PORT}`);
    
})