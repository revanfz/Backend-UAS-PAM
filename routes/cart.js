import { query, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../db.js";
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        msg: "Cart API"
    });
})

router.get("/:username", async (req, res) => {
    const { username } = req.params;
    try {
        await getDoc(doc(db, "cart", username))
        .then(response => {
            res.status(200)
            .json(
                response.data()
            );
        })
    } catch(e) {
        res.status(404)
        .json({
            msg: "user dont have cart"
        })
        console.error(e.message)
    }
})

router.post("/:username", async (req, res) => {
    const { username } = req.params;
    const { id } = req.body;
    try {
        let arr = [];
        let remove = false;
        const result = await getDoc(doc(db, "cart", username))
        .then((response) => {
            const result = [...response.data().cartItem];
            if (!result.includes(id)) {
                arr = [...result, id];
            } else {
                remove = true;
                arr = [...arr.filter((value) => value !== id)];
            }
        })
        await setDoc(doc(db, "cart", username), {
            cartItem: arr,
        })
        .then(() => {
            res.status(200)
            if (!remove) {
                res.json({
                    msg: "Added to wishlist",
                });
            } else {
                res.json({
                    msg: "Item deleted from wishlist"
                })
            }
        });
    } catch(e) {
        res.status(400)
        .json({
            msg: "Error add to wishlist"
        })
        console.error(e.message);
    }
});

export { router as cartRoute };