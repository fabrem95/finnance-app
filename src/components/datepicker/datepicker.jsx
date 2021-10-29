import React, { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";

function DateRngPicker({ dateRngObj: { selectionRange, handleDateRange } }) {
	return (
		<DateRangePicker ranges={[selectionRange]} onChange={handleDateRange} />
	);
}

export default DateRngPicker;
