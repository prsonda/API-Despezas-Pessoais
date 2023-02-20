import { pool } from "../conexion";
import { Response } from "express";

export const validateExistTransaction = async (
	req: any,
	res: Response,
	next: any
) => {
	const transactionID = req.params.id;
	const id = req.user;

	try {
		const { rowCount: transactionExist } = await pool.query(
			"select * from transacoes where usuario_id = $1 AND id = $2",
			[id, transactionID]
		);

		if (transactionExist < 1) {
			return res.status(404).json({ mensagem: "Transação não encontrada" });
		}

		next();
	} catch (error) {
		const err = error as Error;
		console.info(err.message);

		return res.status(500).json({ mensagem: "Erro interno do servidor" });
	}
};
