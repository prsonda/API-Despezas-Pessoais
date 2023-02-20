import { Request, Response } from "express";

export const validateLoginData = async (
	req: Request,
	res: Response,
	next: any
) => {
	const { email, senha } = req.body;

	if (!email || !senha) {
		return res.status(401).json({ mensagem: "Usuário e/ou senha inválido(s)" });
	}

	next();
};
