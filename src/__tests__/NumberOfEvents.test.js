/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-render-in-setup */
import { render } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';
import userEvent from '@testing-library/user-event';
import React from 'react';

describe('<NumberOfEvents /> component', () => {
	let NumberOfEventsComponent;

	beforeEach(() => {
		const setErrorAlert = jest.fn();

		NumberOfEventsComponent = render(
			<NumberOfEvents
				currentNOE={32}
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
		const user = userEvent.setup();
		await user.type(numberOfEvents, '{backspace}{backspace}10');
		expect(numberOfEvents).toHaveValue('10');
	});
});
