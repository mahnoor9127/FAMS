import express from "express";
import { register, login, logout} from "../controllers/authController.js";

const authRouter = express.Router();



authRouter.post('/signup', register);
authRouter.post('/login', login);
authRouter.post('/dashboard', logout);


export default authRouter;

