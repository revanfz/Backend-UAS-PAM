import express from "express";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
	const querySnapshot = await getDocs(collection(db, "products"));
    const products = []
	querySnapshot.forEach((doc) => {
        products.push(doc.data())
    })
    res.send(products)
});

export { router as productRoute };