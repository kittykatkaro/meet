// src/__tests__/App.test.js
import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import EventList from '../components/EventList';
import CitySearch from '../components/CitySearch';

describe('<App /> component', () => {
	test('renders list of events', () => {
		const AppDOM = render(<App />).container.firstChild;
		expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
	});

	describe('<EventList /> component', () => {
		test('renders correct number of events', () => {
			const EventListComponent = render(
				<EventList
					events={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]}
				/>
			);
			expect(EventListComponent.getAllByRole('listitem')).toHaveLength(4);
		});

		test('render CitySearch', () => {
			const AppDOM = render(<App />).container.firstChild;
			expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
		});
	});
});
