// src/__tests__/App.test.js
import React from 'react';
import { fireEvent, render, within, waitFor } from '@testing-library/react';
import App from '../App';
import { getEvents } from '../api';

describe('<App /> component', () => {
	let AppDOM;
	beforeEach(() => {
		AppDOM = render(<App />).container.firstChild;
	});

	test('renders list of events', () => {
		expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
	});

	test('render CitySearch', () => {
		expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
	});
});

describe('<App /> integration', () => {
	test('renders a list of events matching the city selected by the user', async () => {
		const AppComponent = render(<App />);
		const AppDOM = AppComponent.container.firstChild;

		const CitySearchDOM = AppDOM.querySelector('#city-search');
		const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');
	
		// Simulate typing "Berlin" into the city search input
		fireEvent.change(CitySearchInput, { target: { value: 'Berlin' } });
	
		// Wait for the suggestion "Berlin, Germany" to appear in the DOM
		const berlinSuggestionItem = await within(CitySearchDOM).findByText(
			'Berlin, Germany'
		);
		expect(berlinSuggestionItem).toBeInTheDocument();
	
		// Simulate clicking on "Berlin, Germany"
		fireEvent.click(berlinSuggestionItem);
	
		//Ren: I had a question about fireEvent.click, so I searched for information on it. Interestingly, ChatGPT pointed me toward the waitFor method, what a lifesaver! 😄
		//Ren: Wait for the event list to update

	  // Add a small delay to allow for state updates
		await waitFor(async () => {
			const EventListDOM = AppDOM.querySelector('#event-list');
			const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');
			
			// Get all events and filter for Berlin events
			const allEvents = await getEvents();
			const berlinEvents = allEvents.filter(
			(event) => event.location === 'Berlin, Germany'
			);
	
			// Check that the rendered events match the Berlin events
			expect(allRenderedEventItems.length).toBe(berlinEvents.length);
			
			// Additional check to verify the content
			// Ren: Added location to the Events, since we are checking here.
			allRenderedEventItems.forEach((event) => {
			expect(event.textContent).toContain('Berlin, Germany');
			});
		});
	});
});

// Mocking the MutationObserver
global.MutationObserver = class {
	constructor(callback) {}
	observe() {}
	disconnect() {}
};
