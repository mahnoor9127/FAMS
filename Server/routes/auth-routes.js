import express from "express";
import { register, login, logout, homepage, dashboard} from "../controllers/authController.js";

const authRouter = express.Router();



authRouter.post('/signup', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/', homepage);
authRouter.post('/dashboard', dashboard);

export default authRouter;

