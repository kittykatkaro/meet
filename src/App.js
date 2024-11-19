// src/App.js
import React, { useEffect } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import { extractLocations, getEvents } from './api';
import './App.css';
import NumberOfEvents from './components/NumberOfEvents';

const App = () => {
	const [events, setEvents] = React.useState([]);
	const [allLocations, setAllLocations] = React.useState([]);

	useEffect(() => {
		getEvents().then((events) => {
			const locations = extractLocations(events);
			setAllLocations(locations);
			setEvents(events);
		});
	}, []);

	return (
		<div className="App">
			<CitySearch allLocations={allLocations} />
			<NumberOfEvents />
			<EventList events={events} />
		</div>
	);
};

export default App;
