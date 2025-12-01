// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// dotenv.config();  // <-- Load .env
// import path from "path";
// const __dirname = path.resolve();
// let app = express();
// import {createServer} from "node:http";
// import mongoose from "mongoose";


// import userRoutes from "./routes/user.routes.js"

// app.use(express.json({limit : "40kb"}));  //for give limitd data
// app.use(express.urlencoded({limit : "40kb" , extended:true}));
// app.use(cors({
//   origin: true, // or 3000 if using CRA
//   credentials: true
// }));
//   app.use("/api/v2/users" , userRoutes);




// // 🔥 Correct path to Vite build
// //const distPath = path.join(__dirname, "frontend", "vite-project", "dist");

// //app.use(express.static(distPath));

// // 🔥 This will handle refresh on any SPA route
// //

// const connecting =  async()=>{
//   try {
//     await mongoose.connect(process.env.DBS_URL);
//   console.log("Connected");
//   } catch (err) {
//     console.error("❌ MongoDB connection error:", err.message);
//   }
// }
// connecting();
// app.listen(8080 , ()=>{
// console.log(" listening port 8080");
// }
// );

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
const __dirname = path.resolve();
let app = express();
import mongoose from "mongoose";

import userRoutes from "./routes/user.routes.js";

// ------------------ Middlewares ------------------
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// ------------------ API Routes ------------------
app.use("/api/v2/users", userRoutes);

// ------------------ Serve Vite Build ------------------
const distPath = path.join(__dirname, "../frontend/vite-project/dist");

// Serve static assets
app.use(express.static(distPath));

// Express 5 requires RegExp instead of "*"
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// ------------------ MongoDB ------------------
const connecting = async () => {
  try {
    await mongoose.connect(process.env.DBS_URL);
    console.log("Connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  }
};
connecting();

// ------------------ Start Server ------------------
app.listen(8080, () => {
  console.log("Listening on port 8080");
});


// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import path from "path";
// import mongoose from "mongoose";
// import session from "express-session";
// import MongoStore from "connect-mongo";
// import userRoutes from "./routes/user.routes.js";

// dotenv.config();

// const app = express();
// const __dirname = path.resolve();

// // Middlewares
// app.use(express.json({ limit: "40kb" }));
// app.use(express.urlencoded({ limit: "40kb", extended: true }));

// app.use(
//   cors({
//     origin: [
//       "https://secondeducationalfront.onrender.com",
//       "http://localhost:5173",
//     ],
//     credentials: true,
//   })
// );

// // Session + connect-mongo
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({
//       mongoUrl: process.env.DBS_URL,
//       collectionName: "sessions",
//     }),
//     cookie: {
//       maxAge: 86400000,
//       secure: true,
//       sameSite: "none",
//     },
//   })
// );

// // API Routes
// app.use("/api/v2/users", userRoutes);

// // Serve Vite build
// const distPath = path.resolve("./frontend/vite-project/dist");
// app.use(express.static(distPath));

// app.get("(.*)", (req, res) => {
//   res.sendFile(path.join(distPath, "index.html"));
// });

// // MongoDB
// // mongoose
// //   .connect(process.env.DBS_URL)
// //   .then(() => console.log("MongoDB Connected"))
// //   .catch((err) => console.log("Mongo Error:", err));

// // // Start Server
// // const PORT = process.env.PORT || 8080;
// // app.listen(PORT, () => console.log("Server running on port", PORT));


// const connecting =  async()=>{
//   try {//EducationalHub?retryWrites=true&w=majority    "mongodb+srv://omkhodke876_dbs:k7hAeY2CffoUv5aa@cluster0.imwvbqw.mongodb.net/EducationalHub"
//     await mongoose.connect(process.env.DBS_URL);
//   console.log("Connected");
//   } catch (err) {
//     console.error("❌ MongoDB connection error:", err.message);
//   }
// }
// connecting();
// app.listen(8080 , ()=>{
// console.log(" listening port 8080");
// }
// );