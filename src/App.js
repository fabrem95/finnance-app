import React, { useState } from "react";
import "./App.css";
import socket from "./components/socket-client/socket-client";
import Chart from "./components/chart/chart";
import DateRngPicker from "./components/datepicker/datepicker";

function App() {
	//Sate
	const [expenses, setExpenses] = useState([]);
	const [tags, setTags] = useState([]);
	const [selectionRange, setSelectionRange] = useState({
		startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
		endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
		key: "selection",
	});

	socket.on("connected", (dbExpenses, dbTags) => {
		setExpenses(dbExpenses);
		setTags(dbTags);
	});

	const dateRngObj = {
		selectionRange: selectionRange,
		handleDateRange: (ranges) => {
			setSelectionRange(ranges.selection);
		},
	};

	const chartObj = {
		expenses: expenses.filter(
			(exp) =>
				new Date(exp.date) >= selectionRange.startDate &&
				new Date(exp.date) <= selectionRange.endDate
		),
		tags: tags,
	};

	const OnSaveExpenses = () => {
		const newExpense = {
			name: document.querySelector("#expName").value,
			tag: document.querySelector("#expTag").value,
			price: parseInt(document.querySelector("#expPrice").value),
			date: document.querySelector("#expDate").value,
		};

		socket.emit("save-expense", newExpense);
	};

	return (
		<div className="App">
			<form>
				<div>
					<label for="expName">Name:</label>
					<input id="expName" type="text" name="expName"></input>
				</div>
				<div>
					<label for="expTag">Tag:</label>
					<select id="expTag" name="expTag">
						{tags.map((tag) => {
							return (
								<option key={tags.indexOf(tag)} value={tag.name}>
									{tag.name}
								</option>
							);
						})}
					</select>
				</div>
				<div>
					<label for="expPrice">Price:</label>
					<input id="expPrice" type="number" name="expPrice"></input>
				</div>
				<div>
					<label for="expDate">Date:</label>
					<input id="expDate" type="date" name="expDate"></input>
				</div>
				<button onClick={OnSaveExpenses}>Save</button>
			</form>
			<DateRngPicker dateRngObj={dateRngObj} />
			<Chart chartObj={chartObj} />
		</div>
	);
}

export default App;
