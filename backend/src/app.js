import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();  // <-- Load .env
import path from "path";
const __dirname = path.resolve();
let app = express();
import {createServer} from "node:http";
import mongoose from "mongoose";


import userRoutes from "./routes/user.routes.js"

app.use(express.json({limit : "40kb"}));  //for give limitd data
app.use(express.urlencoded({limit : "40kb" , extended:true}));
app.use(cors({
  origin: true, // or 3000 if using CRA
  credentials: true
}));
 app.use("/api/v2/users" , userRoutes);
app.use(express.static(path.join(__dirname, "../../frontend/vite-project/dist")));
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/vite-project/dist/index.html"));
});


const connecting =  async()=>{
  try {//EducationalHub?retryWrites=true&w=majority    "mongodb+srv://omkhodke876_dbs:k7hAeY2CffoUv5aa@cluster0.imwvbqw.mongodb.net/EducationalHub"
    await mongoose.connect(process.env.DBS_URL);
  console.log("Connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  }
}
connecting();
app.listen(8080 , ()=>{
console.log(" listening port 8080");
}
);