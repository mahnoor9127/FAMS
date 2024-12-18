import  express  from "express"; 

import cors from "cors";
import CookieParser from "cookie-parser";
import mongoose from "mongoose";
import  authRouter  from './routes/auth-routes.js';
import { defineConfig } from "vite";
import bodyParser from "body-parser";


mongoose.connect("mongodb://127.0.0.1:27017/my-mern-app").then(()=>console.log("Mongo DB connected successfully!")).catch(err=>console.log("Mongo Error",err));
const app=express();
const port=8081;

const corsOptions={
  credentials:true,
  origin:'http://localhost:5173'
};

app.use(bodyParser.json());

app.use(express.json());
app.use(CookieParser());
app.use(cors(corsOptions));


app.use('/api/auth',authRouter);


defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8081", 
        changeOrigin: true,
      },
    },
  },
});

app.listen(port,()=>{
  console.log(`Server started successfully at PORT:${port}`);
});

export { authRouter, defineConfig};