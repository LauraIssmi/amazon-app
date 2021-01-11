import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/uploadRouter.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const URI = "mongodb+srv://admin:admin@amazon.j9xhc.mongodb.net/test?retryWrites=true&w=majority";

const connectDB = async () => {
	try {
		await mongoose.connect(URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log("connected");
	} catch (error) {
		console.log(error.message);
	}
};

app.use("/api/uploads", uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.get(`/api/config/paypal`, (req, res) => {
	res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
//app.get(`/`, (req, res) => {
//	res.send("server is ready");
//});
app.use(express.static(path.join(__dirname, "/Frontend/build")));
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "/Frontend/build/index.html")));
//erreur catcher
app.use((err, req, res, next) => {
	res.status(500).send({ message: err.message });
});

connectDB();
const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Serve at http:${port}`);
});
