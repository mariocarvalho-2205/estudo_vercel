import "dotenv/config"; // Carrega as variáveis UMA VEZ
import express from "express";
import db from "./db/db.js";
import router from "./routes/Router.js";
import cors from "cors";

// console.log("index", process.env.SUPABASE_URL); // Acessa as variáveis

const app = express();
const port = 3000;

// password vercel_backend = Msct.142205!

app.use(
	cors({
		credentials: true,
		origin: ["https://meu-frontend.vercel.app", "http://localhost:5173"],
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type"],
	})
);

app.use(express.json());

app.use(router);

db.sync()
	.then(() => {
		app.listen(port, () => {
			console.info(`connect to port d ${port}`);
		});
	})
	.catch((err) => console.error("Erro no server ", err));
