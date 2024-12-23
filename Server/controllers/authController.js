import  userModel  from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

 const register=async(req,res)=>{
const {name, password}=req.body;
if(!name || !name || !password){
  return res.json ({success:false, message:"All fields are required"});
}
try{

  const existingUser=await userModel.findOne({name});
  if(existingUser)
    return res.json({sucess:false, message:"User already exists"});
  const hashedPassword=await bcrypt.hash(password,10);
  const user=new userModel({name, password:hashedPassword});
  await user.save();
  const secret=process.env.JWT_SECRET;
  const token=jwt.sign({id:user._id },secret, {expiresIn:'7d'});

  res.cookie('token', token,{
    httpOnly:true,
    secure:process.env.NODE_ENV==='production',
    sameSite:process.env.NODE_ENV==='production' ? 'none':'strict',
    maxAge:7*24*60*60*1000
  });
  return res.json({success:true});
  

}
catch(err){
res.json({success:false, message:err.message});
}
}

 const login=async(req,res)=>{
  const {name, password}=req.body;
 console.log({name, password});
  if(!name|| !password){
    return res.json({success:false, message:'All fields are required!'});}
  try{
    const user=await userModel.findOne({name});
    console.log(user);
    if(!user){
      return res.json({success:false, message:'Invalid credentials!'});
    }
    const isMatch=await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.json({success:false, message:'Invalid credentials'});
    }
    const token=jwt.sign({id:user._id }, process.env.JWT_SECRET, {expiresIn:'7d'});

    res.cookie('token', token,{
      httpOnly:true,
      secure:process.env.NODE_ENV==='production',
      sameSite:process.env.NODE_ENV==='production' ? 'none':'strict',
      maxAge:7*24*60*60*1000
    });

    return res.json({success:true, message:'Login successful!'});

  }
  catch(err){
    return res.json({success:false, message:err.message})
  }
}


 const logout=async(req,res)=>{
  try{
    res.clearCookie('token',{
      httpOnly:true,
      secure:process.env.NODE_ENV==='production',
      sameSite:process.env.NODE_ENV==='production' ? 'none':'strict',

    })
    return res.json({success:true, message:'Logged Out!'});
  }
  catch(err){
    return res.json({success:false, message:err.message});

  }
}

export { login, logout, register};
