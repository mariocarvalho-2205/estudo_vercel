import { Sequelize } from "sequelize";

// console.log("db",process.env.DATABASE_URL ? "chegou" : "nao chegou");
// const db = process.env.DATABASE_URL ? "chegou" : "Nao chegou"

const db = new Sequelize(process.env.DATABASE_URL, {
	dialect: "postgres",
	host: "localhost",
});

db.authenticate()
	.then(() => console.log("Conexão com o banco OK"))
	.catch((err) => {
		console.error("Falha na conexão com o DB:", err);
		process.exit(1); // Encerra o app se o DB falhar
	});

export default db;
