import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../db.js";

export const addAccount = async (req, res, next) => {
	try {
		const data = req.body;
        const findAcc = doc(db, "users", data.username)
        const docSnap = await getDoc(findAcc)
        if (!docSnap.exists()) {
            const accountRef = doc(db, "users", data.username)
            await setDoc(accountRef, { capital: true }, { merge: true });
		    console.log("Data berhasil dimasukkan");
        } else {
            res.status(400).json({
                msg: "Username Already Registered"
            })
            throw new Error('Username already registered')
        }
		res.status(200).json({
            msg: "Pendaftaran User Behasil"
        });
	} catch (err) {
		console.error(err.message);
	}
};
