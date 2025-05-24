import { Sequelize } from "sequelize";

// console.log("db",process.env.DATABASE_URL ? "chegou" : "nao chegou");
// const db = process.env.DATABASE_URL ? "chegou" : "Nao chegou"

// Verifica se o pg está instalado
try {
  require('pg');
} catch (error) {
  console.error('ERRO: Pacote pg não instalado. Rode: npm install pg');
  process.exit(1);
}

const db = new Sequelize(process.env.DATABASE_URL, {
	dialect: "postgres",
	logging: false,
	// host: "localhost",
});

db.authenticate()
	.then(() => console.log("Conexão com o banco OK"))
	.catch((err) => {
		console.error("Falha na conexão com o DB:", err);
		process.exit(1); // Encerra o app se o DB falhar
	});

export default db;
