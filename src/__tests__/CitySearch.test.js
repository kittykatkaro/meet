// src/__tests__/CitySearch.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import { extractLocations, getEvents } from '../api';

describe('<CitySearch /> component', () => {
	let CitySearchComponent;
	beforeEach(() => {
		CitySearchComponent = render(<CitySearch />);
	});

	test('allLocations contains valid data', async () => {
		const allEvents = await getEvents();
		const allLocations = extractLocations(allEvents);
		console.log('All Locations:', allLocations); // Debug-Ausgabe
		expect(allLocations).toContain('Berlin, Germany'); // Beispiel: sollte deinen Standort enthalten
	});

	test('renders text input', () => {
		const cityTextBox = CitySearchComponent.queryByRole('textbox');
		expect(cityTextBox).toBeInTheDocument();
		expect(cityTextBox).toHaveClass('city');
	});

	test('suggestions list is hidden by default', () => {
		const suggestionList = CitySearchComponent.queryByRole('list');
		expect(suggestionList).not.toBeInTheDocument();
	});

	test('renders a list of suggestions when city textbox gains focus', async () => {
		const cityTextBox = CitySearchComponent.queryByRole('textbox');
		fireEvent.focus(cityTextBox);
		const suggestionList = CitySearchComponent.queryByRole('list');
		expect(suggestionList).toBeInTheDocument();
		expect(suggestionList).toHaveClass('suggestions');
	});

	test('updates list of suggestions correctly when user types in city textbox', async () => {
		const allEvents = await getEvents();
		const allLocations = extractLocations(allEvents);
		CitySearchComponent.rerender(
			<CitySearch allLocations={allLocations} />
		);

		// user types "Berlin" in city textbox
		const cityTextBox = CitySearchComponent.queryByRole('textbox');
		fireEvent.change(cityTextBox, { target: { value: 'Berlin' } });

		// filter allLocations to locations matching "Berlin"
		const suggestions = allLocations
			? allLocations.filter((location) => {
					return (
						location
							.toUpperCase()
							.indexOf(cityTextBox.value.toUpperCase()) > -1
					);
			  })
			: [];

		// get all <li> elements inside the suggestion list
		const suggestionListItems =
			CitySearchComponent.queryAllByRole('listitem');

		expect(suggestionListItems).toHaveLength(suggestions.length + 1);
		for (let i = 0; i < suggestions.length; i += 1) {
			expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
		}
	});

	test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
		const allEvents = await getEvents();
		const allLocations = extractLocations(allEvents);
		CitySearchComponent.rerender(
			<CitySearch allLocations={allLocations} />
		);

		const cityTextBox = CitySearchComponent.queryByRole('textbox');
		fireEvent.change(cityTextBox, { target: { value: 'Berlin' } });

		// the suggestion's textContent look like this: "Berlin, Germany"
		const BerlinGermanySuggestion =
			CitySearchComponent.queryAllByRole('listitem')[0];

		await fireEvent.click(BerlinGermanySuggestion);

		expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
	});
});
