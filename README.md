# American Safari 1.2

This app was created to help with planning camping, hiking, sightseeing trips, etc. specifcally in relation to native animal species the user might see along the way. There are three input fields to help specify the query, and two main displays of information. This app also retains the ability to save queries for later reference.

An update to the initial American Safari group project (link here: https://github.com/RJFreeman77/project1)

Updates Include: 
* Landing Page with introduction to American Safari project
* Updated UI 
* "New Search" feature corrected

## Getting Started

All you need to access the page is the url link:

https://carsoncurry.github.io/American-Safari/index.html

## Usage

There are three important pieces of input. All three are required fields to process a query:

    1. Trip Name: A trip name must be chosen not only to help the user identify the query, but as an identifing signature when the trip query is saved. A simple text input.

    2. Date Parameters: A trip's starting and ending date must be chosen through a dropdown calender. To select the date range, the dropdown menu is clicked, the first day of the trip is then clicked, and then the last day of the trip is clicked. For the date range to be registered, the "apply" button must be selected. To clear the selected dates, the "cancel" button can be selected. 

    3.Location: A location for the trip must be chosen from the options on the second dropdown menu. Currently only National Parks are avalible. The dropdown is clicked and the park is chosen from the list. When selected, the name of the park is displayed along with a map of the park.

Once all three inputs are selected, the "Submit" button must be pressed in order to process the request. Until the Submit button is pressed, any of the three search parameters may be changed.

When the Submit button is pressed, the trip is saved under the entered in a saved list under the entered trip name. The page then returns a list of the top 10 animals encountered in the listed park during the listed date range. This is presented as a list with each entry having a corresponding image and a link to the wikipedia entry on the species.

The page also has two other functionalities:

    The entire page can be cleared with a "new search" button. This does not clear the saved trips.

    Under the "My Trips" dropdown, the results from any previous trip can be recalled, including the map display.

Built With

    HTML

    CSS

        Bootstrap

        daterangepicker.css

    JavaScript

        Moment.js

        Leaflet.js

        JQuery.js

    iNaturalist API

    Google Places API

    CORS Anywhere API

    Firebase

Authors

    Ryan Freeman - JavaScript functionality, iNaturalist API, Firebase

    Carson Curry - UI work (HTML, CSS(Bootstrap), daterangepicker.css)
    - Version 1.2 Updates

    John Caldwell - Google Places API, CORS Anywhere API, Leaflet.js
