import { Response } from "express";
import { pool } from "../conexion.js";
const jwt = require("jsonwebtoken");
require("dotenv").config();
const passwordJWT = process.env.PASSWORDJWT;

export const validateUserLogin = async (req: any, res: Response, next: any) => {
	const { authorization } = req.headers;

	try {
		const token = authorization.split(" ")[1];

		if (!token) {
			return res.status(401).json({ message: "Usuário não autorizado" });
		}

		const { id } = jwt.verify(token, passwordJWT);

		const { rowCount } = await pool.query(
			"select * from usuarios where id = $1",
			[id]
		);

		if (rowCount < 1) {
			return res.status(401).json({ message: "Usuário não autorizado" });
		}

		req.user = id;

		next();
	} catch (error) {
		const err = error as Error;
		console.info(err.message);

		return res.status(500).json({ mensagem: "Erro interno do servidor" });
	}
};
