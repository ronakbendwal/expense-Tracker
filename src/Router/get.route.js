import { Router } from "express";
import { verifyUser } from "../Middleware/auth.middleware.js";
import { getAllExpenses } from "../Controller/allExpenses.controller.js";

const getroute=Router();

getroute.get("/",verifyUser,getAllExpenses)

export {getroute}