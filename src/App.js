// src/App.js
import React from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import './App.css';

const App = () => {
	return (
		<div className="App">
			<CitySearch />
			<EventList />
		</div>
	);
};

export default App;
