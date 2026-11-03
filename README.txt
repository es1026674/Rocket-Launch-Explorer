GitHub repository: https://github.com/es1026674/Rocket-Launch-Explorer

In the callback version, `getUpcomingLaunches` receives a callback function, such as `populateDropdown`. It runs after the successful request returns and passes the response's `results` array to that callback.

In the Axios version, XMLHttpRequest callbacks are replaced with Axios promises, so `getUpcomingLaunches` no longer needs a callback parameter. `.then()` handles a successful response and uses its data to populate the page, while `.catch()` handles request errors and displays an error message.
