import { Response } from "express";
import { pool } from "../conexion";
import bcrypt from "bcrypt";

export const updateUser = async (req: any, res: Response) => {
	const { nome, email, senha } = req.body;
	const id = req.user;

	try {
		const emailExisting = await pool.query(
			"select * from usuarios where email = $1",
			[email]
		);

		if (emailExisting.rowCount > 0) {
			if (emailExisting.rows[0].id !== id) {
				return res.status(401).json({
					mensagem: "Já existe usuário cadastrado com o e-mail informado.",
				});
			}
		}

		const encryptedPassword = await bcrypt.hash(senha, 10);

		await pool.query(
			"update usuarios set  nome = $1, email = $2, senha = $3 where id = $4",
			[nome, email, encryptedPassword, id]
		);

		return res.status(204).send();
	} catch (error) {
		const err = error as Error;
		console.info(err.message);

		return res.status(500).json("Erro interno do servidor");
	}
};
