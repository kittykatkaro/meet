# Meet App

This repository contains the **Meet App**, a serverless, progressive web application (PWA) that provides a smooth and interactive experience for users to view and filter upcoming events. The app integrates with the Google Calendar API to display real-time event data.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Setup and Installation](#setup-and-installation)
5. [Usage](#usage)
6. [Testing](#testing)
7. [License](#license)
8. [Author](#author)

---

## Project Overview
The **Meet App** allows users to view a list of upcoming events pulled directly from their Google Calendar. It offers options to filter events by city, display event details, and work seamlessly offline, making it ideal for users on the go.

This project was built as part of learning serverless architecture and progressive web application development.

---

## Features
- **Google Calendar Integration**: Fetches real-time event data from the Google Calendar API.
- **Event Filtering**: Filter events based on location.
- **Event Details**: View details like date, time, and description of events.
- **Progressive Web App (PWA)**: Installable on mobile and desktop devices.
- **Offline Capability**: Works offline using service workers.
- **Responsive Design**: Optimized for all devices (mobile, tablet, and desktop).

---

## Technologies Used
- **React** - Component-based front-end framework.
- **Google Calendar API** - Integration for event data.
- **Serverless Functions** - Backend functionality using AWS Lambda.
- **Jest & Cucumber** - For testing components and features.
- **Enzyme** - Testing utilities for React.
- **CSS** - Styling the user interface.
- **Service Workers** - Enabling offline functionality.

---

## Setup and Installation
To run the Meet App locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/kittykatkaro/meet.git
   cd meet
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Google Calendar API**:
   - Follow [Google Calendar API documentation](https://developers.google.com/calendar) to obtain API credentials.
   - Add the credentials to your environment configuration.

4. **Start the development server**:
   ```bash
   npm start
   ```
   The app will run at `http://localhost:3000`.

5. **Build for production**:
   ```bash
   npm run build
   ```

---

## Usage
- Open the app in a browser.
- View the list of upcoming events.
- Use the filter to search for events by city.
- Click on events to view details.
- Install the app as a PWA for offline access.

---

## Testing
The project includes unit and end-to-end testing:

- **Run Unit Tests**:
   ```bash
   npm test
   ```
- **Run End-to-End Tests**:
   ```bash
   npm run test:e2e
   ```

The app uses **Jest** and **Cucumber** for behavior-driven testing.

---

## License
This project is licensed under the **MIT License**.

---

## Author
**Kittykatkaro**  
[GitHub Profile](https://github.com/kittykatkaro)  
[LinkedIn](#) _(Replace with your LinkedIn profile URL)_

---

Thank you for exploring the Meet App! 📅✨
