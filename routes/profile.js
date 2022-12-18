import express from "express";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../db.js";

const router = express.Router();

router.get("/:username", async (req, res) => {
    try{
        const { username } = req.params;
        const findAcc = doc(db, "users", username)
        const docSnap = await getDoc(findAcc)
        if (docSnap.exists()) {
            res.json(
                docSnap.data()
            );
        } else {
            res.status(400).json({
                msg: "Gagal"
            });
        }
    } catch (e) {
        console.error(e.message);
    }  
});

router.patch("/:username", async (req, res) => {
    try {
        const { username } = req.params;
        const { password } = req.body;
        const findAcc = await getDoc(doc(db, "users", username));
        if (findAcc.exists()) {
            if (findAcc.data().type === "user") {
                await setDoc(doc(db, "users", username), { password }, { merge: true })
                .then(() => {
                    res.status(200)
                    .contentType('application/json')
                    .json({
                     msg: "Password Berhasil Diubah"
                    })
                });
            } else {
                res.status(400)
                .contentType('application/json; charset=utf-8')
                .json({
                    msg: "Untuk mengganti password admin harap hubungi developer"
                })
                throw new Error("Password Admin hanya dapat diubah lewat database");
            }
        } else {
            res.status(404)
            .contentType('application/json')
            .json({
                msg: "Username not Exist"
            })
        }
    } catch(e) {
        console.error(e.message);
    }
})

export { router as profileRoute }