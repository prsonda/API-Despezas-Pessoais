import { pool } from "../conexion";
import { Response } from "express";

export const detailUser = async (req: any, res: Response) => {
	const id = req.user;

	try {
		const { rows } = await pool.query("select * from usuarios where id = $1", [
			id,
		]);

		const { senha, ...userData } = rows[0];

		return res.json(userData);
	} catch (error) {
		const err = error as Error;
		console.info(err.message);

		return res.status(500).json({ mensagem: "Erro interno do servidor" });
	}
};
