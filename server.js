import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { PORT, HOST } from "./config.js";
import { registerRoute } from "./routes/register.js";
import { productRoute } from "./routes/product.js";
import { purchaseRoute } from "./routes/purchase.js";
import { loginRoute } from "./routes/login.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/product", productRoute);
app.use("/api/register", registerRoute);
app.use("/api/purchase", purchaseRoute);
app.use("/api/login", loginRoute);

app.get("/api", (req, res) => {
	res.status(200)
	.contentType('application/json')
	.json({
		msg: "Hello World",
		key: "UAS PAM",
	});
});

app.listen(PORT, () => {
	console.log(`App running on http://${HOST}:${PORT}`);
});
