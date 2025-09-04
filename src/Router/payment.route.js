import { Router } from "express";
import {addPayment} from "../Controller/addPayment.controller.js"
import { verifyUser } from "../Middleware/auth.middleware.js";
const paymentRoute=Router()

paymentRoute.post("/:blogId",verifyUser,addPayment)


export {paymentRoute}