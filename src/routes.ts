import { Router } from "express";

import { detailUser } from "./controllers/detail-user";
import { transactionsGroup } from "./controllers/group-transactions";
import { listCategory } from "./controllers/list-category";
import { registerTransaction } from "./controllers/register-transaction";
import { registerUser } from "./controllers/registerUser";
import { transactionsID } from "./controllers/transactions-id";
import { userLogin } from "./controllers/user-login";
import { validateCategoryId } from "./middlewares/validate-category-id";
import { validateLoginData } from "./middlewares/validate-data-login";
import { validateDataTransaction } from "./middlewares/validate-data-transaction";
import { validateEmailExist } from "./middlewares/validate-email-exist";
import { validateInputType } from "./middlewares/validate-input-type.js";
import { validateUserData } from "./middlewares/validate-user-data";
import { validateUserLogin } from "./middlewares/validate-user-login";
import { updateUser } from "./controllers/update-user";
import { transactionUpdate } from "./controllers/uptade-transaction";
import { validateExistTransaction } from "./middlewares/validate-transaction-exist";
import { deleteTransaction } from "./controllers/delete-transaction";
import { extractTransactions } from "./controllers/extract-transactions";

export const routes = Router();

routes.post("/login", validateLoginData, userLogin);
routes.post("/usuario", validateUserData, validateEmailExist, registerUser);

routes.use(validateUserLogin);

routes.get("/categoria", listCategory);
routes.get("/usuario", detailUser, validateUserData, validateEmailExist);
routes.get("/transacao", transactionsGroup);
routes.get("/transacao/extrato", extractTransactions);
routes.get("/transacao/:id", transactionsID);

routes.put("/usuario", validateUserData, updateUser);
routes.put(
	"/transacao/:id",
	validateExistTransaction,
	validateDataTransaction,
	validateCategoryId,
	validateInputType,
	transactionUpdate
);

routes.post(
	"/transacao",
	validateDataTransaction,
	validateCategoryId,
	validateInputType,
	registerTransaction
);

routes.delete("/transacao/:id", validateExistTransaction, deleteTransaction);
