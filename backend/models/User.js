import { DataTypes } from "sequelize";
import db from "../db/db.js";

const User = db.define(
	"User",
	{
		nome: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: true,
		tableName: "users",
	}
);

export default User
