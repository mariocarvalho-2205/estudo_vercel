import { Sequelize } from 'sequelize';
import pg from 'pg';

// Configuração segura para desenvolvimento e produção
const dbConfig = {
  dialect: 'postgres',
  dialectModule: pg,
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Permite certificados auto-assinados
    }
  }
};

// Configuração específica para produção (Supabase)
if (process.env.NODE_ENV === 'production') {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL não está definida para produção');
  }

  dbConfig.dialectOptions.ssl = {
    require: true,
    rejectUnauthorized: false
  };
  
  // Opcional: Configuração específica do Supabase
  if (process.env.SUPABASE_URL) {
    dbConfig.dialectOptions.connection = {
      options: `project=${process.env.SUPABASE_URL.split('/').pop()}`
    };
  }
}

// Conexão com o banco de dados
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://user:pass@localhost:5432/dbname',
  dbConfig
);

// Teste de conexão
(async () => {
  try {
    await db.authenticate();
    console.log('✅ Conexão com o banco estabelecida');
  } catch (error) {
    console.error('❌ Falha na conexão com o banco:', error);
    process.exit(1);
  }
})();

export default db;