import React from 'react';

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
	const handleInputChanged = (event) => {
		const value = event.target.value;

		if (isNaN(value) || value < 0) {
			setErrorAlert('Invalid numbers');
			return;
		} else {
			setErrorAlert('');
			setCurrentNOE(value);
		}
	};

	return (
		<div id="numberOfEvents">
			<label htmlFor="numberOfEventsInput">Number of Events</label>
			<input
				id="numberOfEventsInput"
				type="text"
				className="number"
				placeholder="Enter number of events"
				onChange={handleInputChanged}
			/>
		</div>
	);
};

export default NumberOfEvents;
