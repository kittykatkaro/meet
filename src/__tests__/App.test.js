// src/__tests__/App.test.js
import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import EventList from '../components/EventList';

describe('<App /> component', () => {
	test('renders list of events', () => {
		const AppDOM = render(<App />).container.firstChild;
		expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
	});

	describe('<EventList /> component', () => {
		test('has an element with "list" role', () => {
			const EventListComponent = render(<EventList />);
			expect(EventListComponent.queryByRole('list')).toBeInTheDocument();
		});
	});
});
