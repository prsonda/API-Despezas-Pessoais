import { pool } from "../conexion";
import { Request, Response } from "express";

export const validateEmailExist = async (
	req: Request,
	res: Response,
	next: any
) => {
	const { email } = req.body;

	const emailExisting = await pool.query(
		"select * from usuarios where email = $1",
		[email]
	);

	if (emailExisting.rowCount > 0) {
		return res.status(401).json({
			mensagem: "Já existe usuário cadastrado com o e-mail informado.",
		});
	}

	next();
};
