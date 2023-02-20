import { pool } from "../conexion";
import { Response } from "express";

export const deleteTransaction = async (req: any, res: Response) => {
	const { id } = req.params;
	try {
		pool.query("delete from transacoes where id = $1", [id]);

		res.status(204).json();
	} catch (error) {
		const err = error as Error;
		console.info(err.message);

		return res.status(500).json({ mensagem: "Erro interno do servidor" });
	}
};
