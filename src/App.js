import React, { useState } from "react";
import Chart from "./components/chart/chart";
import "./App.css";
import socket from "./components/socket-client/socket-client";

function App() {
	const [expenses, setExpenses] = useState([]);
	const [tags, setTags] = useState([]);

	const chartObj = {
		expenses: expenses,
		tags: tags,
	};

	socket.on("connected", (dbExpenses, dbTags) => {
		setExpenses(dbExpenses);
		setTags(dbTags);
	});

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
			<Chart chartObj={chartObj} />
		</div>
	);
}

export default App;
