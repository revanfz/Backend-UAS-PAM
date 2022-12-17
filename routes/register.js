import express from "express"
import { addAccount } from "../controllers/registerController.js";
const router = express.Router()

router.get("/", (req, res) => {
    res.status(200).json({
        msg: "API Register"
    });
})

router.post("/", addAccount);

export { router as registerRoute }