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
	const [currentCity, setCurrentCity] = useState("See all cities"); //Ren: Maintain a state for City
	const [allLocations, setAllLocations] = useState([]);

	const fetchData = async () => {
		try {
		  const allEvents = await getEvents();

		  // Ren: Filter the events based on currentCity user's choice
		  const filteredEvents =
			currentCity === "See all cities"
			  ? allEvents
			  : allEvents.filter((event) => event.location === currentCity);

		  setEvents(filteredEvents.slice(0, currentNOE));
		  setAllLocations(extractLocations(allEvents));
		} catch (error) {
		  console.error("Error fetching events. Please try again later.");
		}
	  };

	useEffect(() => {
		fetchData();
	}, [currentCity, currentNOE]); // Ren: Watch for City or NOE state and call fetchData if they gets modified.

	useEffect(() => {
		getEvents().then((events) => {
			const locations = extractLocations(events);
			setAllLocations(locations);
			setEvents(events, currentNOE);
		});
	}, []);

	return (
		<div className="App">
			{/* Ren: Passing state setter method, so that CitySearch component can inform App component (see below) .. */}
			{/* Ren: that it has changed the city, so App can re-render the events list */}
			<CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />

			<NumberOfEvents />
			<EventList events={events} />
		</div>
	);
};

export default App;
