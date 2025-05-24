import express from "express";
import db from "./db/db.js";
import router from "./routes/Router.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

// Configuração do CORS atualizada
app.use(cors({
  origin: [
    'https://estudo-vercel-e99u.vercel.app',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['X-Requested-With', 'Content-Type', 'Accept'],
  credentials: true
}));

app.use(express.json());
app.use('/api', router); // Prefixo para todas as rotas

// Inicialização segura
const startServer = async () => {
  try {
    await db.authenticate();
    console.log('✅ Banco conectado');
    
    if (process.env.NODE_ENV !== 'production') {
      await db.sync();
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