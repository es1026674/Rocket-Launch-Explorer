// ** JavaScript Starter File **
// Purpose: Populate a dropdown of upcoming launches and display mission details
// and a rocket image using callbacks (Part 1), then refactor to promises (Part 2).

// Space Devs development endpoint: no rate limits, but the data is stale and limited.
const BASE_URL = "https://lldev.thespacedevs.com/2.3.0";

function getUpcomingLaunches() {
  axios
    .get(BASE_URL + "/launches/upcoming/")
    .then(function (response) {
      populateDropdown(response.data.results);
    })
    .catch(function (error) {
      console.error("Unable to load upcoming launches.", error);
    });
}

// Step 2: Create populateDropdown(launches)
// - Receives an array of launches
// - Adds one <option> per launch: text = launch name, value = launch id
function populateDropdown(launches) {
  const dropdown = document.getElementById("launchDropdown");

  launches.forEach(function (launch) {
    const option = document.createElement("option");
    option.text = launch.name;
    option.value = launch.id;
    dropdown.appendChild(option);
  });
}

// Step 3: Add event listener to #launchDropdown
// - On change, get the selected launch ID
// - Call getLaunchDetails(launchId)
document.getElementById("launchDropdown").addEventListener("change", function () {
  const launchId = this.value;
  getLaunchDetails(launchId);
});

function getLaunchDetails(launchId) {
  axios
    .get(BASE_URL + "/launches/" + launchId + "/")
    .then(function (response) {
      displayLaunchInfo(response.data);
    })
    .catch(function (error) {
      console.error("Unable to load launch details.", error);
    });
}

// Step 5: Create displayLaunchInfo(launch)
// - Updates #missionDetails with the mission name and description (if available)
// - Creates an image of the rocket (launch.rocket.configuration.image.image_url) and appends it to #rocket
// - If no image is available, displays a message instead
function displayLaunchInfo(launch) {
  const missionDetails = document.getElementById("missionDetails");
  const rocket = document.getElementById("rocket");
  missionDetails.replaceChildren();
  rocket.replaceChildren();

  const heading = document.createElement("h2");
  heading.textContent = launch.name;
  missionDetails.appendChild(heading);

  const description = launch.mission && launch.mission.description;
  const paragraph = document.createElement("p");
  paragraph.textContent = description || "No mission description available.";
  missionDetails.appendChild(paragraph);

  const image =
    launch.rocket &&
    launch.rocket.configuration &&
    launch.rocket.configuration.image;

  if (image && image.image_url) {
    const imageElement = document.createElement("img");
    imageElement.src = image.image_url;
    imageElement.alt = launch.name + " rocket";
    rocket.appendChild(imageElement);
  } else {
    rocket.textContent = "No rocket image available.";
  }
}

// Final step: kick off the flow
getUpcomingLaunches();

// ---------------------------------------------------------------
// PART 2: Axios and promises (refactor after Part 1 is committed)
// ---------------------------------------------------------------
// - Replace both XHR requests with axios.get(...).then(...).catch(...)
// - Show "Loading..." in #status while a request is pending
// - Show a clear error message in #status when a request fails
// - Clear the status message when data arrives
