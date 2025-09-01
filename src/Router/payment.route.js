import { Router } from "express";
import { verify } from "jsonwebtoken";
import {addPayment} from "../Controller/addPayment.controller.js"
const paymentRoute=Router()

paymentRoute.post("/pay/:blogId",verify,addPayment)