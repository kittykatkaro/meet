import React from 'react';

const NumberOfEvents = () => {
	const [numberOfEvents, setNumberOfEvents] = React.useState(32);

	const handleInputChanged = (event) => {
		const value = event.target.value;
		setNumberOfEvents(value);
	};

	return (
		<div id="numberOfEvents">
			<label htmlFor="numberOfEventsInput">Number of Events</label>
			<input
				id="numberOfEventsInput"
				type="text"
				className="number"
				placeholder="Enter number of events"
				value={numberOfEvents}
				onChange={handleInputChanged}
			/>
		</div>
	);
};

export default NumberOfEvents;
