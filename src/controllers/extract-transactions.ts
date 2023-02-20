import { pool } from "../conexion";
import { Response } from "express";

export const extractTransactions = async (req: any, res: Response) => {
	const id = req.user;

	try {
		const { rows: fetchEntries } = await pool.query(
			`SELECT SUM(valor) FROM transacoes where usuario_id = $1 AND tipo = 'entrada'`,
			[id]
		);

		const { rows: lookForExits } = await pool.query(
			`SELECT SUM(valor) FROM transacoes where usuario_id = $1 AND tipo = 'saida'`,
			[id]
		);

		let entry: number = Number(fetchEntries[0].sum);
		let exit: number = Number(lookForExits[0].sum);

		if (entry === null) {
			entry = 0;
		}

		if (exit === null) {
			exit = 0;
		}

		const extract = {
			entrada: entry,
			saída: exit,
		};

		return res.json(extract);
	} catch (error) {
		const err = error as Error;
		console.info(err.message);

		return res.status(500).json({ mensagem: "Erro interno do servidor" });
	}
};
