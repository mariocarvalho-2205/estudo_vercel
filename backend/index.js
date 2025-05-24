import "dotenv/config";
import pg from 'pg';
import express from "express";
import db from "./db/db.js";
import router from "./routes/Router.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.disable('x-powered-by');

// Configuração do CORS
app.use(cors({
  origin: [
    'https://estudo-vercel-e99u.vercel.app',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

app.options('*', cors());
app.use(express.json());

// Rotas
app.use('/api', router); // Prefixo modificado para /api

// Tratamento de erros global
process.on('uncaughtException', (err) => {
  console.error('Erro não tratado:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('Promise rejeitada não tratada:', err);
});

// Inicialização segura
const startServer = async () => {
  try {
    await db.authenticate();
    console.log('✅ Banco conectado');
    
    if (process.env.NODE_ENV !== 'production') {
      await db.sync({ force: false });
      console.log('✅ Modelos sincronizados');
    }

    app.listen(port, () => {
      console.log(`🚀 Servidor rodando na porta ${port}`);
    });
  } catch (error) {
    console.error('❌ Falha na inicialização:', error);
    process.exit(1);
  }
};

startServer();

export default app;