import { pool } from "../conexion";
import { Response } from "express";

export const transactionsGroup = async (req: any, res: Response) => {
	const id = req.user;
	try {
		const query = `select t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id, c.descricao as categoria_nome from transacoes t join categorias c on c.id = t.categoria_id where t.usuario_id = $1`;

		const { rows: transactions, rowCount } = await pool.query(query, [id]);

		res.json(transactions);
	} catch (error) {
		const err = error as Error;
		console.info(err.message);

		return res.status(500).json({ mensagem: "Erro interno do servidor" });
	}
};
