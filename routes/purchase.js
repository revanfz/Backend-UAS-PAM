import express from "express";
import { collection, getDoc } from "firebase/firestore";
import { buyItem } from "../controllers/purchaseController.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        msg: "purchase"
    });
})

router.post("", buyItem);

export { router as purchaseRoute }