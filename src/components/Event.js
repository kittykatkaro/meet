// src/components/Event.js
import React, { useState } from 'react';
const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <li className="event" key={event.id}>
        <h2 className="event_summary">{event.summary}</h2>
        <p className="event_date">{event.created}</p>
        <p className="event_location">{event.location}</p>
        <button
          className="showDetailsButton"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
      </li>
      {showDetails ? (
        <div className="details">
          <h3>Event Details</h3>
          <p>{event.description}</p>
        </div>
      ) : null}
    </>
  );
};

export default Event;
