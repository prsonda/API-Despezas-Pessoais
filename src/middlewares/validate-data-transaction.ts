import { Request, Response } from "express";

export const validateDataTransaction = (
	req: Request,
	res: Response,
	next: any
) => {
	const { descricao, valor, data, categoria_id, tipo } = req.body;

	if (!descricao || !valor || !data || !categoria_id || !tipo) {
		return res.status(401).json({
			mensagem: "Todos os campos obrigatórios devem ser informados.",
		});
	}

	next();
};
