import { query, doc, getDoc, setDoc, arrayUnion } from "firebase/firestore";
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
});

router.post("/:username/:state?", async (req, res) => {
    const { username, state } = req.params;
    const { id } = req.body;
    console.log(state)
    try {
        let arr = [];
        let remove = false;
        await getDoc(doc(db, "cart", username))
        .then((response) => {
            const result = [...response.data().cartItem];
            const filtered = result.filter(x => x.id == id);
            const non_filtered = result.filter(x => x.id != id);
            if (filtered.length > 0) {
                if (state === "plus") filtered[0].jumlah += 1;
                else if (state === "minus" && filtered[0].jumlah > 0) filtered[0].jumlah -= 1;
            } else {
                filtered.push({ id, jumlah: 1 });
            }
            arr = [...non_filtered, ...filtered];
            console.log(arr);
        });

        await setDoc(doc(db, "cart", username), {
            cartItem: arr,
        }, { merge: true })
        .then(() => {
            res.status(200)
            if (!remove) {
                res.json({
                    msg: "Added to wishlist",
                    data: arr,
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