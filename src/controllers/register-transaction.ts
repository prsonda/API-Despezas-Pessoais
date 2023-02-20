import { pool } from "../conexion";
import { Response } from "express";

export const registerTransaction = async (req: any, res: Response) => {
	const { descricao, valor, data, categoria_id, tipo } = req.body;

	const usuarioId = req.user;
	const category = req.category;

	try {
		let { rows: transactionRegister } = await pool.query(
			`insert into transacoes(descricao, valor, data, categoria_id, tipo, usuario_id) values($1, $2, $3, $4, $5, $6) returning *`,
			[descricao, valor, data, categoria_id, tipo, usuarioId]
		);

		const presentResult = {
			id: transactionRegister[0].id,
			tipo: transactionRegister[0].tipo,
			descricao: transactionRegister[0].descricao,
			valor: transactionRegister[0].valor,
			data: transactionRegister[0].data,
			usuario_id: transactionRegister[0].usuario_id,
			categoria_id: transactionRegister[0].categoria_id,
			categoria_nome: category.descricao,
		};

		res.status(201).json(presentResult);
	} catch (error) {
		const err = error as Error;
		console.info(err.message);

		return res.status(500).json({ mensagem: "Erro interno do servidor" });
	}
};
