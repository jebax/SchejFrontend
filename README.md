Schej Frontend
==============

React frontend for our shift scheduling and swapping web app! We used Cypress for testing, and [`react-big-calendar`](https://github.com/intljusticemission/react-big-calendar) for the calendar component. You can find the Rails API backend for this project [here](https://github.com/chloeverity/SchejBackend).

[Here](http://schej-frontend.surge.sh/) is a link to our deployed frontend on Surge

## Our learning logs
[Here](https://waffle.io/jebax/SchejFrontend) is our card wall for the entire project (frontend and backend).
[Here](https://github.com/jebax/SchejFrontend/wiki) is a link to our Wiki which kept up-to-date with new stuff that we learned.

## Installation

This project requires the use of [our Rails API backend](https://github.com/chloeverity/SchejBackend), so make sure you have that installed and running on a port *other* than `http://localhost:3000`.

1) Clone the repository
2) Run `npm install` to install local dependencies
3) Run `npm start` to start the React app at `http://localhost:3000`
4) Run `npx cypress open` to run the feature tests in Cypress. The app must be running for the tests to execute.
5) Run `npm test` to run the unit tests in Jest/Enzyme. The app does not need to be running for these tests.

## Contributing

If you have any suggestions, please create a GitHub issue, or feel free to make a pull request!


