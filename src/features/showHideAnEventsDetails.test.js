/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-node-access */
import { render, waitFor, within } from '@testing-library/react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import Event from '../components/Event';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
	test('An event element is collapsed by default.', ({
		given,
		when,
		then,
	}) => {
		let AppDOM;
		given('the user opened the app', () => {
			AppDOM = render(<App />).container.firstChild;
		});

		when('the list of events are rendered', async () => {
			const EventListDOM = AppDOM.querySelector('#event-list');
			await waitFor(() => {
				const EventListItem =
					within(EventListDOM).getAllByRole('listitem');
				expect(EventListItem).toHaveLength(35);
			});
		});

		then('event details should not show', () => {
			const EventDetails = AppDOM.querySelector('.event-details');
			expect(EventDetails).toBeNull();
		});
	});

	test('User can expand an event to see details.', ({
		given,
		when,
		then,
	}) => {
		let EventComponent;
		let allEvents;
		given('the user is seeing the events rendered', async () => {
			allEvents = await getEvents();
			EventComponent = render(<Event event={allEvents[0]} />);
			expect(
				EventComponent.container.querySelector('.details')
			).not.toBeInTheDocument();
		});

		when('the user clicks the show details button', async () => {
			const user = userEvent.setup();
			const showDetails = EventComponent.queryByText('Show Details');
			await user.click(showDetails);
		});

		then('the event details should be shown', () => {
			const eventDetails =
				EventComponent.container.querySelector('.details');
			expect(eventDetails).toBeInTheDocument();
		});
	});

	test('User can collapse an event to hide details.', ({
		given,
		when,
		then,
	}) => {
		let EventComponent;
		let allEvents;
		given('the user has clicked the show details button', async () => {
			allEvents = await getEvents();
			EventComponent = render(<Event event={allEvents[0]} />);
		});

		when('the user clicks the hide details button', () => {
			const user = userEvent.setup();
			const hideDetails = EventComponent.queryByText('Hide Details');
			user.click(hideDetails);
		});

		then('the event details should be hidden', () => {
			const eventDetails =
				EventComponent.container.querySelector('.details');
			expect(eventDetails).not.toBeInTheDocument();
		});
	});
});
