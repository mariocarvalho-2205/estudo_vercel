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
app.disable('x-powered-by'); // Segurança adicional
// password vercel_backend = Msct.142205!

// Domínios permitidos
const allowedOrigins = [
  'https://estudo-vercel-e99u.vercel.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: [
    'https://estudo-vercel-e99u.vercel.app',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

// Rota especial para OPTIONS (preflight)
app.options('*', cors());

app.use(express.json());

// Rotas
app.use('/user', router);

process.on('uncaughtException', (err) => {
  console.error('Erro não tratado:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('Promise rejeitada não tratada:', err);
});

// Inicialização segura
const start = async () => {
  try {
    await db.authenticate();
    console.log('✅ Banco conectado');
    
    if (process.env.NODE_ENV !== 'production') {
      await db.sync({ force: false });
      console.log('✅ Modelos sincronizados');
    }

    app.listen(3000, () => {
      console.log(`🚀 Servidor rodando na porta 3000`);
    });
  } catch (error) {
    console.error('❌ Falha na inicialização:', error);
    process.exit(1);
  }
};

start();
export default app