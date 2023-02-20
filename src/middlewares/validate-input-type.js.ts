import { Request, Response } from "express";

export const validateInputType = (req: Request, res: Response, next: any) => {
	const { tipo } = req.body;

	if (tipo.toLowerCase() === "entrada" || tipo.toLowerCase() === "saida") {
		next();
	} else {
		return res.status(401).json({ mensagem: "Tipo de transação inválida" });
	}
};
