import express from "express";
import { checkAccount } from "../controllers/loginController.js";

const router = express.Router();

router.get("/", (req, res) => {
    response.status(200).json({
        msg: "Login API"
    });
});

router.post("/", checkAccount);

export { router as loginRoute }