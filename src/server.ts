import { app } from "./index";
require("dotenv").config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.info(`Aplicação rodando na porta ${port}`);
});
