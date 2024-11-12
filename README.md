# Meet App

Meet App is a progressive web application (PWA) that allows users to view and manage events. It provides offline access, data visualization through charts, and allows users to customize the number of events displayed on screen. Additionally, users can quickly access the app by adding a shortcut to their home screen.

## Table of Contents

- [Project Overview](#project-overview)
- [User Stories](#user-stories)
- [Gherkin Scenarios](#gherkin-scenarios)

## Project Overview

Meet App is designed to make it easy for users to stay informed about events, whether they are online or offline. With features like event detail toggling, event customization, and offline functionality, users can personalize their experience and access data quickly and conveniently. This project is a PWA, so it can be installed on mobile devices and accessed with a shortcut from the home screen.

## User Stories

1. **Filter eveny by city**
   - As a **user**, I should be able to **filter events by city** so that I can quickly **find events happening in a specific location** that interests me.

2. **Show/Hide Event Details**  
   - As a **user**, I should be able to **show or hide event details** so that **I can view only the information I need at any given moment**.

2. **Specify Number of Events**  
   - As a **user**, I should be able to **specify the number of events displayed** so that **I can customize the amount of information I see based on my preference or screen size**.

3. **Use the App When Offline**  
   - As a **user**, I should be able to **use the app even when I’m offline** so that **I can still access important information about events without an internet connection**.

4. **Add an App Shortcut to the Home Screen**  
   - As a **user**, I should be able to **add a shortcut for the app to my home screen** so that **I can quickly access the app without having to open my browser**.

5. **Display Charts Visualizing Event Details**  
   - As a **user**, I should be able to **see charts that visualize event details** so that **I can easily interpret key information and make informed decisions**.

## Gherkin Scenarios

### Filter events by City
  ```gherkin
Feature: Filter events by city

Scenario: User filters events by a selected city
  Given the user is viewing a list of all events
  And the user wants to see events in a specific city
  When the user selects a city from the city filter options
  Then only events from the selected city should be displayed in the list
  And events from other cities should be hidden
```

### Show/Hide Event Details
   ```gherkin
   Feature: Show or hide event details

   Scenario: User toggles event details visibility
     Given the user is viewing a list of events
     When the user selects "Show Details" on an event
     Then the event details should be displayed
     And the user can select "Hide Details" to collapse the details again
```

### Specify Number of Events
```gherkin
Feature: Specify the number of events displayed

Scenario: User sets the number of events to display
  Given the user wants to control how many events are shown on the page
  When the user specifies a number of events to display
  Then the app should display only that specified number of events
```

### Use the App when Offline
```gherkin
Feature: Offline access for the app

Scenario: User accesses the app while offline
  Given the user has previously accessed the app with an internet connection
  And has saved data locally
  When the user opens the app without an internet connection
  Then the user should be able to view event details offline
```

### Add an App Shortcut to the Home Screen 
```gherkin
Feature: Add app shortcut to the home screen

Scenario: User adds a shortcut to the home screen
  Given the user wants quick access to the app
  When the user chooses the "Add to Home Screen" option
  Then a shortcut to the app should be added to the user's home screen
```

### Display Charts Visualizing Event Details
```gherkin
Feature: Display charts for event details visualization

Scenario: User views event details with visual charts
  Given the user wants a visual summary of event data
  When the user views an event with charts enabled
  Then the app should display relevant charts summarizing event details
```
