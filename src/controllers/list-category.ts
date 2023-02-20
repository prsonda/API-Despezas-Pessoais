import { pool } from "../conexion";
import { Request, Response } from "express";

export const listCategory = async (req: Request, res: Response) => {
	try {
		const { rows: category } = await pool.query("select * from categorias");

		res.json(category);
	} catch (error) {
		const err = error as Error;
		console.info(err.message);

		return res.status(500).json({ mensagem: "Erro interno do servidor" });
	}
};
