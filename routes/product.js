import express from "express";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
	const querySnapshot = await getDocs(collection(db, "shoes"));
    const products = []
	querySnapshot.forEach((doc) => {
        products.push(doc.data().value)
    })
    res.status(200).json(products);
});

export { router as productRoute };
