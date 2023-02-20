import { Request, Response } from "express";

export const validateUserData = async (
	req: Request,
	res: Response,
	next: any
) => {
	const { nome, email, senha } = req.body;

	if (!nome) {
		return res
			.status(401)
			.json({ mensagem: "O campo nome não pode ser vázio" });
	} else if (!email) {
		return res
			.status(401)
			.json({ mensagem: "O campo e-mail não pode ser vázio" });
	} else if (!senha) {
		return res
			.status(401)
			.json({ mensagem: "O campo senha não pode ser vázio" });
	}
	next();
};
