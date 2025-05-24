import express from "express";
import db from "./db/db.js";
import router from "./routes/Router.js";
import cors from "cors";

const app = express();

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

// Rota de teste para verificar se o servidor está funcionando
app.get('/', (req, res) => {
  res.json({ message: 'Backend funcionando!' });
});

// Middleware para testar a conexão com o banco antes de usar as rotas
const dbMiddleware = async (req, res, next) => {
  try {
    await db.authenticate();
    next();
  } catch (error) {
    console.error('Erro na conexão com o banco:', error);
    res.status(500).json({ error: 'Erro na conexão com o banco de dados' });
  }
};

// Aplicando o middleware apenas nas rotas que precisam do banco
app.use('/api', dbMiddleware, router);

// Se estiver rodando localmente
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
  });
}

export default app;