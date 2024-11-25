import { fireEvent, render } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';
import React from 'react';

describe('<NumberOfEvents /> component', () => {
	let NumberOfEventsComponent;

	beforeEach(() => {
		const setErrorAlert = jest.fn();

		NumberOfEventsComponent = render(
			<NumberOfEvents
				setNumberOfEvents={() => {}}
				setCurrentNOE={() => {}}
				setErrorAlert={setErrorAlert}
			/>
		);
	});

	test('has an element with "textbox" role', () => {
		const numberEventsTextBox =
			NumberOfEventsComponent.queryByRole('textbox');
		expect(numberEventsTextBox).toBeInTheDocument();
	});

	test('default value is 32', () => {
		const numberEventsTextBox =
			NumberOfEventsComponent.queryByRole('textbox');
		expect(numberEventsTextBox).toHaveValue('32');
	});

	test('update numberOfEvents when user types', async () => {
		const numberOfEvents = NumberOfEventsComponent.queryByRole('textbox');
		fireEvent.change(numberOfEvents, { target: { value: '10' } });
		expect(numberOfEvents).toHaveValue('10');
		//expect(setErrorAlert).toHaveBeenCalledWith("");
	});
});
