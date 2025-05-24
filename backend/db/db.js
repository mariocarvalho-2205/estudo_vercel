import {Sequelize} from "sequelize";

// console.log("db",process.env.DATABASE_URL ? "chegou" : "nao chegou");
// const db = process.env.DATABASE_URL ? "chegou" : "Nao chegou"

const db = new Sequelize(process.env.DATABASE_URL, {
	dialect: "postgres",
	host: "localhost",
});

try {
	db.authenticate();
	console.info("Conexão com o banco de dados foi bem-sucedida.");
} catch (error) {
	console.error("Erro ao conectar ao banco de dados:", error);
}

export default db;
