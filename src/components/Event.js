// src/components/Event.js
import React from 'react';
const Event = ({ event }) => {
	return <li>{event.summary}</li>;
};

export default Event;
