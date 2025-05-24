import pg from 'pg';
import { Sequelize } from 'sequelize';

const { Pool } = pg;

// Configuração otimizada para Vercel
const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectModule: pg,
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    connection: {
      options: `project=${process.env.SUPABASE_URL.split('/').pop()}`
    }
  },
  define: {
    freezeTableName: true
  }
});

// Verificação de conexão
(async () => {
  try {
    await db.authenticate();
    console.log('🟢 Conexão com Supabase estabelecida');
    
    // Sincronização segura para produção
    if (process.env.NODE_ENV === 'development') {
      await db.sync();
      console.log('🟢 Modelos sincronizados');
    }
  } catch (error) {
    console.error('🔴 Erro de conexão:', error);
    process.exit(1);
  }
})();

export default db;