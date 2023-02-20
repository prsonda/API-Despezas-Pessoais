import { pool } from "../conexion";
import { Response } from "express";

export const validateCategoryId = async (
	req: any,
	res: Response,
	next: any
) => {
	const { categoria_id } = req.body;

	try {
		const { rows: categoryId, rowCount } = await pool.query(
			"select * from categorias where id = $1",
			[categoria_id]
		);

		if (rowCount < 1) {
			return res.status(404).json({ mensagem: "Categoria não cadastrada" });
		}

		req.category = categoryId[0];

		next();
	} catch (error) {
		console.info(error.message);

		return res.status(500).json({ mensagem: "Erro interno do servidor" });
	}
};
