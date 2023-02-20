import { pool } from "../conexion";
import { Response } from "express";

export const transactionsID = async (req: any, res: Response) => {
	const id = req.user;
	const transaction = req.params.id;
	try {
		const query = `select t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id, c.descricao as categoria_nome from transacoes t join categorias c on c.id = t.categoria_id where t.usuario_id = $1 AND t.id = $2`;

		const { rows: transactions, rowCount } = await pool.query(query, [
			id,
			transaction,
		]);

		if (rowCount < 1) {
			res.json({
				mensagem: "Transação não encontrada.",
			});
		}

		res.json(transactions[0]);
	} catch (error) {
		const err = error as Error;
		console.info(err.message);

		return res.status(500).json({ mensagem: "Erro interno do servidor" });
	}
};
