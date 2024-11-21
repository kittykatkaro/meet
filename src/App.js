// src/App.js
import React, { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';
import './App.css';

const App = () => {
	const [events, setEvents] = useState([]);
	const [currentNOE, setCurrentNOE] = useState(32);
	const [allLocations, setAllLocations] = useState([]);

	// const fetchData = async () => {
	// 	const allEvents = await getEvents();
	// 	setEvents(allEvents.slice(0, currentNOE));
	// 	setAllLocations(extractLocations(allEvents));
	// };

	// useEffect(() => {
	// 	fetchData();
	// }, []);

	useEffect(() => {
		getEvents().then((events) => {
			const locations = extractLocations(events);
			setAllLocations(locations);
			setEvents(events, currentNOE);
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
