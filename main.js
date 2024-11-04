const section = document.querySelector('section');
let fetchedData = [];

// Variable used to generate background colors
let backgroundColors = ["#FF8B64", "#55C2E6", "#FF5E7D", "#4BCF82", "#7335D2", "#F1C75B"];

// Variables used to generate little images on top of div
let backgroundImages = ["./images/icon-work.svg", "./images/icon-play.svg", "./images/icon-study.svg", "./images/icon-exercise.svg", "./images/icon-social.svg", "./images/icon-self-care.svg"];

// Variables used to choose the selected p to switch color to white
let daily = document.getElementById("daily");
let weekly = document.getElementById("weekly");
let monthly = document.getElementById("monthly");

// Set weekly as the default selected value
weekly.style.color = "white";

// Fetch data and refresh display based on the selected timeline
function refreshDataFetched(timeline) {
  fetch('./data.json')
    .then((request) => {
      if (!request.ok) {
        console.log('Oops! Something went wrong.');
        return null;
      }
      return request.json();
    })
    .then((data) => {
      console.log("Data fetched");
      fetchedData = data;

      //clear box
      section.innerHTML = '';

      // Loop through the fetched data and create boxes
      fetchedData.forEach((element, index) => {
        let backgroundColor = backgroundColors[index];
        let backgroundImage = backgroundImages[index];

        // Pass the correct timeframes based on the selected timeline
        createBox(backgroundColor, backgroundImage, element.title, element.timeframes[timeline], timeline);
      });
    });
}
/**
 * Creates a display box with a background color, background image, title, and time information.
 * Used to generate a box when fetching data.
 * 
 * @param {string} backgroundColor 
 * @param {string} backgroundImage 
 * @param {string} title 
 * @param {Object} timeframes
 * @param {Object} timeframes.daily
 * @param {number} timeframes.daily.current
 * @param {number} timeframes.daily.previous
 * @param {Object} timeframes.weekly
 * @param {number} timeframes.weekly.current
 * @param {number} timeframes.weekly.previous
 * @param {Object} timeframes.monthly
 * @param {number} timeframes.monthly.current
 * @param {number} timeframes.monthly.previous
 */
function createBox(backgroundColor, backgroundImage, title, timeframes, timeline) {
  const div = document.createElement("div");
  div.className = "box";
  div.style.backgroundColor = backgroundColor;

  const bgImage = document.createElement("img");
  bgImage.src = backgroundImage;
  bgImage.className = "bgImage";

  const childDiv = document.createElement("div");
  childDiv.className = "childBox";

  const upperDiv = document.createElement("div");
  upperDiv.className = "upperDiv";

  const h2 = document.createElement("h2");
  h2.innerText = title;

  const ellipsis = document.createElement("img");
  ellipsis.src = "./images/icon-ellipsis.svg";

  upperDiv.appendChild(h2);
  upperDiv.appendChild(ellipsis);

  const lowerDiv = document.createElement("div");
  lowerDiv.className = "lowerDiv";

  const time = document.createElement('p');
  time.innerText = timeframes.current + " Hrs";

  const previousTime = document.createElement("p");

  // Set the correct label based on the timeline
  let label = "";
  switch (timeline) {
      case "daily":
          label = "Last Day - ";
          break;
      case "weekly":
          label = "Last Week - ";
          break;
      case "monthly":
          label = "Last Month - ";
          break;
      default:
          label = "Last Week - ";
          break;
  }

  previousTime.innerHTML = `${label}` + timeframes.previous + " hrs";

  lowerDiv.appendChild(time);
  lowerDiv.appendChild(previousTime);

  childDiv.append(upperDiv);
  childDiv.appendChild(lowerDiv);

  div.appendChild(bgImage);
  div.appendChild(childDiv);
  section.appendChild(div);
}

// Initial data fetch with the default timeline
refreshDataFetched("weekly");

// Function changing the selected timeline and refresh the data
function changeSelectedTimeLine(selected) {
  switch (selected) {
    case "daily":
      monthly.style.color = "#7078C9";
      weekly.style.color = "#7078C9";
      daily.style.color = "white";
      refreshDataFetched("daily");
      break;

    case "weekly":
      monthly.style.color = "#7078C9";
      daily.style.color = "#7078C9";
      weekly.style.color = "white";
      refreshDataFetched("weekly");
      break;

    case "monthly":
      weekly.style.color = "#7078C9";
      daily.style.color = "#7078C9";
      monthly.style.color = "white";
      refreshDataFetched("monthly");
      break;
  }
}
