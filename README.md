---

# Weather API

This repository hosts a Weather API project that allows users to get current weather information for any city around the world. The API is designed to provide real-time data such as temperature, humidity, wind speed, and weather conditions using a simple and intuitive interface.

## Live Demo

You can try the live demo of the Weather API here:(https://sudhanshugxyz.github.io/Weather-Api/))

## Features

- **Current Weather Information**: Fetches real-time weather data for any city.
- **Weather Data**: Includes temperature, humidity, wind speed, and weather description.
- **Search by City Name**: Users can search for weather info by entering the name of any city.
- **Simple and Clean Interface**: Easy-to-use and responsive UI for better user experience.
- **Error Handling**: Displays appropriate messages when the city is not found or if there's any issue fetching the data.

## Tech Stack

- **HTML5**: Structure of the application.
- **CSS3**: Styling the components and ensuring responsiveness.
- **JavaScript (Vanilla)**: Handling the API calls and updating the UI with real-time data.
- **OpenWeather API**: Used for fetching weather data.

## How to Use

1. Visit the live demo link given.
2. Enter the name of a city in the search box.
3. Click on the "Search" button or press Enter.
4. View the current weather conditions for the city including temperature, humidity, wind speed, and weather description.

## Installation

To run the project locally, follow these steps:

1. Clone this repository:
   ```bash
   git clone https://github.com/13sudhanshu/Weather-Api.git
   ```
2. Open the project folder.
3. Open `index.html` in your preferred browser.

No additional setup is required as it is a static web application.

## API Key

This project uses the OpenWeather API to fetch weather data. To use the API, you will need an API key.

1. Visit [OpenWeather API](https://openweathermap.org/api) and create an account.
2. Generate your own API key.
3. Replace the API key in the script of `index.js` (or wherever the API call is made).

```javascript
const apiKey = "YOUR_API_KEY";
```

## Contributing

1. Fork this repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## Acknowledgments

- [OpenWeather](https://openweathermap.org/) for providing the weather data API.
- Bootstrap for helping with responsive design.
- Icons from [FontAwesome](https://fontawesome.com/) for better UI elements.

---

Feel free to customize it further based on any specific details or additional instructions you may want to include.
