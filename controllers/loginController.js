import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../db.js";

export const checkAccount = async (req, res, next) => {
	try {
		const data = req.body;
        const findAcc = doc(db, "users", data.username)
        const docSnap = await getDoc(findAcc)
        if (docSnap.exists()) {
            const { password } = docSnap.data();
		    console.log("Username ada");
            if (data.password === password) {
                res.status(200)
                .contentType("application/json")
                .json({
                    msg: "Login Berhasil"
                });
            } else {
                res.status(400)
                .contentType("application/json")
                .json({
                    msg: "Password Salah!"
                })
                throw new Error("Password Salah!");
            }
        } else {
            res.status(400)
            .contentType("application/json")
            .json({
                msg: "Username did not exist!"
            })
            throw new Error('Username did not exist!')
        }
	} catch (err) {
		console.error(err.message);
	}
};
