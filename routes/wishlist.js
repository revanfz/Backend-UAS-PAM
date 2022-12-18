import { doc, getDoc, setDoc } from 'firebase/firestore'
import express from 'express';
import { db } from '../db.js';

const router = express.Router();

router.get("/:username", async (req, res) => {
    const { username } = req.params;
    const { id } = req.body;
    try {
        await getDoc(doc(db, "wishlist", username))
        .then((response) => {
            res.status(200)
            .json(
                response.data()
            )
        })
    } catch(e) {
        res.status(400)
        .json({
            msg: e.message
        })
        console.error(e.message);
    }
});

router.post("/:username", async (req, res) => {
    const { username } = req.params;
    const { id } = req.body;
    try {
        let arr = [];
        const wishRef = await getDoc(doc(db, "wishlist", username))
        if (!wishRef.exists()) {
            await setDoc(doc(db, "wishlist", username), { wishItem: [] }, { merge: true });
        } else {
            arr = [...wishRef.data().wishItem];
        }
        if ( arr.includes(id) ) {
            arr = arr.filter(x => x !== id);
        } else {
            arr.push(id);
        }
        await setDoc(doc(db, "wishlist", username), { wishItem: arr })
        .then((response) => {
            res.status(200)
            .json({
                msg: "Item ditambahkan ke wishlist"
            });
        });
    } catch(e) {
        res.status(400)
        .json({
            msg: "Error getting wishlist" 
        });
        console.error(e.message);
    }
})

export { router as wishlistRoute };