import { Request, Response } from "express";
const jwt = require("jsonwebtoken");
const passwordJWT = process.env.PASSWORDJWT;
import { pool } from "../conexion";
import bcrypt from "bcrypt";

export const userLogin = async (req: Request, res: Response) => {
	const { email, senha } = req.body;

	try {
		const { rows: userData, rowCount } = await pool.query(
			"select * from usuarios where email = $1",
			[email]
		);

		if (rowCount === 0) {
			return res.status(400).json({
				mensagem: "Email não cadastrado",
			});
		}

		const { senha: passwordUser, ...user } = userData[0];

		const validatePassword = await bcrypt.compare(senha, passwordUser);

		if (!validatePassword) {
			return res.status(401).json({ mensagem: "Senha inválida" });
		}

		const tokenUser = jwt.sign({ id: user.id }, passwordJWT, {
			expiresIn: "8h",
		});

		return res.json({
			user,
			tokenUser,
		});
	} catch (error) {
		const err = error as Error;
		console.info(err.message);

		return res.status(500).json({ mensagem: "Erro interno do servidor" });
	}
};
