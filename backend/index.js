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

// Domínios permitidos
const allowedOrigins = [
  'https://estudo-vercel-e99u.vercel.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    // Permite requests sem origin (como mobile apps ou curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'A política de CORS não permite acesso deste domínio';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Rota especial para OPTIONS (preflight)
app.options('*', cors());

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
