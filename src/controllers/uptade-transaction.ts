import { Response } from "express";
import { pool } from "../conexion";

export const transactionUpdate = async (req: any, res: Response) => {
	const { descricao, valor, data, categoria_id, tipo } = req.body;

	const { id } = req.params;

	const usuarioId = req.user;

	try {
		let { rows: updateTransaction } = await pool.query(
			`update transacoes set descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5, usuario_id = $6 where id = $7`,
			[descricao, valor, data, categoria_id, tipo, usuarioId, id]
		);

		res.status(204).json();
	} catch (error) {
		const err = error as Error;
		console.info(err.message);

		return res.status(500).json({ mensagem: "Erro interno do servidor" });
	}
};
