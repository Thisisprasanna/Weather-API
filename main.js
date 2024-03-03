const mainForm = document.querySelector(".mainForm");
const card = document.querySelector(".card");
const apiKey = "47dca435f247d3f59126296206c7c768";

mainForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const cityName = document.querySelector(".cityName").value;

  try {
    if (cityName) {
      const reqData = await collectData(cityName);
      displayAll(reqData);
    } else {
      displayError("Enter a City Name");
    }
  } catch (error) {
    displayError("Unable to fetch data");
    console.error(error);
  }
});

async function collectData(cityName) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Oops!, Unable to Fetch Data");
  }

  return await response.json();
}

function displayAll(data) {
  const {
    name: cityName,
    main: { temp },
    weather: [{ description, id }],
  } = data;

  const cityNameDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const emojiDisplay = document.createElement("p");

  cityNameDisplay.textContent = cityName;
  tempDisplay.textContent = `Temperature: ${(temp - 273.15).toFixed(1)}°C`; // Assuming the temperature is in Celsius
  descDisplay.textContent = description;
  emojiDisplay.textContent = emojiDisplaying(id);

  cityNameDisplay.classList.add("cityNameDisplay");
  tempDisplay.classList.add("tempDisplay");
  descDisplay.classList.add("descDisplay");
  emojiDisplay.classList.add("emojiDisplay");

  card.innerHTML = ""; // Clear previous data
  card.append(cityNameDisplay);
  card.append(tempDisplay);
  card.append(descDisplay);
  card.append(emojiDisplay);
  card.style.display = "block";
}

function emojiDisplaying(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "🌩";
    case weatherId >= 300 && weatherId < 400:
      return "🌧";
    case weatherId >= 500 && weatherId < 600:
      return "🌧";
    case weatherId >= 600 && weatherId < 700:
      return "❄";
    case weatherId === 800:
      return "☀";
    case weatherId >= 801 && weatherId < 805:
      return "☁";
    default:
      return "❓";
  }
}

function displayError(errorMessage) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = errorMessage;
  errorDisplay.classList.add("errorDisplay");
  card.innerHTML = ""; // Clear previous data
  card.append(errorDisplay);
  card.style.display = "block";
}
