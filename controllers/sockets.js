const SaveControl = require("../models/save-control");
const saveControl = new SaveControl();

const socketController = (socketClient) => {
	socketClient.on("connected", () => {
		console.log("Usuario conectado");
	});

	socketClient.emit(
		"connected",
		saveControl.getExpenses.expenses,
		saveControl.getTags.tags
	);

	socketClient.on("save-expense", (newExpense) => {
		saveControl.saveExpenseDB(newExpense);
	});
};

module.exports = {
	socketController,
};
