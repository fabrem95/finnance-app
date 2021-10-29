import React from "react";
import { Pie } from "react-chartjs-2";

function Chart({ chartObj: { tags, expenses } }) {
	const tagsNames = tags.map((tag) => {
		return tag.name;
	});

	const pricePerTag = () => {
		let data = [];
		for (let tag of tagsNames) {
			expenses.filter((exp) => {
				if (exp.tag === tag)
					data[tagsNames.indexOf(tag)] = !data[tagsNames.indexOf(tag)]
						? exp.price
						: data[tagsNames.indexOf(tag)] + exp.price;
			});
		}

		return data;
	};

	const data = {
		labels: tagsNames,
		datasets: [
			{
				label: "# of Votes",
				data: pricePerTag(),
				backgroundColor: [
					"rgba(255, 99, 132, 0.2)",
					"rgba(54, 162, 235, 0.2)",
					"rgba(255, 206, 86, 0.2)",
					"rgba(75, 192, 192, 0.2)",
					"rgba(153, 102, 255, 0.2)",
					"rgba(255, 159, 64, 0.2)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
				],
				borderWidth: 1,
			},
		],
	};

	return (
		<section>
			<Pie data={data} width={100} height={100} />
		</section>
	);
}

export default Chart;
