import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
	let browser;
	let page;
	beforeAll(async () => {
		browser = await puppeteer.launch();
		page = await browser.newPage();
		await page.goto('http://localhost:3000/');
		await page.waitForSelector('.event');
	});

	afterAll(() => {
		browser.close();
	});

	test('An event element is collapsed by default', async () => {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto('http://localhost:3000/');

		await page.waitForSelector('.event');
		const eventDetails = await page.$('.event .eventDetails');
		expect(eventDetails).toBeNull();
		browser.close();
	});

	test('User can expand an event to see its details', async () => {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto('http://localhost:3000/');
		await page.waitForSelector('.event');
		await page.click('.event .showDetailsButton');
		const eventDetails = await page.$('.event .eventDetails');
		expect(eventDetails).toBeDefined();
		browser.close();
	});

	test('User can collapse an event to hide its details', async () => {
		await page.click('.event .showDetailsButton');
		const eventDetails = await page.$('.event .eventDetails');
		expect(eventDetails).toBeNull();
	});
});

describe('filter events by city', () => {
	let browser;
	let page;
	beforeAll(async () => {
		browser = await puppeteer.launch();
		page = await browser.newPage();
		await page.goto('http://localhost:3000/');
		await page.waitForSelector('.city');
	});

	afterAll(() => {
		browser.close();
	});

	test('When user hasn’t searched for a city, show upcoming events from all cities', async () => {
		const events = await page.$('.event');
		expect(events).toBeDefined();
	});

	test('User should see a list of suggestions when they search for a city', async () => {
		await page.type('.city', 'Berlin Germany');
		const suggestions = await page.$('.suggestions');
		expect(suggestions).toBeDefined();
	});

	test('User can select a city from the suggested list', async () => {
		await page.click('.suggestions li');
		const city = await page.$('.city');
		expect(city).toBeDefined();
	});
});
