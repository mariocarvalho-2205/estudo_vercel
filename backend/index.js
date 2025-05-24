import "dotenv/config"; // Carrega as variáveis UMA VEZ
import pg from 'pg';
import express from "express";
import db from "./db/db.js";
import router from "./routes/Router.js";
import cors from "cors";

console.log('PG version:', pg.default ? pg.default.version : pg.version); // Verificação
// console.log("index", process.env.SUPABASE_URL); // Acessa as variáveis

const app = express();
const port = 3000;

// password vercel_backend = Msct.142205!

app.use(
	cors({
		credentials: true,
		origin: ["https://estudo-vercel-e99u.vercel.app/", "http://localhost:5173"],
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type"],
	})
);

app.use(express.json());

app.use(router);

process.on('uncaughtException', (err) => {
  console.error('Erro não tratado:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('Promise rejeitada não tratada:', err);
});

db.sync()
	.then(() => {
		app.listen(port, () => {
			console.info(`connect to port d ${port}`);
		});
	})
	.catch((err) => console.error("Erro no server ", err));
