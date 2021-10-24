const path = require("path");
const fs = require("fs");

class SaveControl {
	constructor() {
		this.expenses = [];
		this.tags = [];

		this.init();
	}

	init() {
		this.expenses = require("../db/expenses.json").expenses;
		this.tags = require("../db/tags.json").tags;
	}

	get getExpenses() {
		return { expenses: this.expenses };
	}

	get getTags() {
		return { tags: this.tags };
	}

	setExpenses(newExpense) {
		this.expenses.push(newExpense);
	}

	saveExpenseDB(newExpense) {
		this.setExpenses(newExpense);

		const pathDB1 = path.join(__dirname, "../db/expenses.json");

		fs.writeFileSync(pathDB1, JSON.stringify(this.getExpenses));
	}
}

module.exports = SaveControl;
