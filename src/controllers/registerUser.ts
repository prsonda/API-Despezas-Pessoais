import { pool } from "../conexion";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

export const registerUser = async (req: Request, res: Response) => {
	const { nome, email, senha } = req.body;

	try {
		const encryptedPassword = await bcrypt.hash(senha, 10);

		const registerAtTheBank = `
              insert into usuarios (nome, email, senha) 
              values ($1, $2, $3) returning *
              `;

		const { rows: userRegistered } = await pool.query(registerAtTheBank, [
			nome,
			email,
			encryptedPassword,
		]);

		const { senha: _, ...user } = userRegistered[0];

		return res.status(201).json(user);
	} catch (error) {
		const err = error as Error;
		console.info(err.message);

		return res.status(500).json({ mensagem: "Erro interno do servidor" });
	}
};
