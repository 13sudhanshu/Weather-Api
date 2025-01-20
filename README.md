Weather API
This repository hosts a Weather API project that allows users to get current weather information for any city around the world. The API is designed to provide real-time data such as temperature, humidity, wind speed, and weather conditions using a simple and intuitive interface.

Live Demo
You can try the live demo of the Weather API here:
Weather API Live Demo

Features
Current Weather Information: Fetches real-time weather data for any city.
Weather Data: Includes temperature, humidity, wind speed, and weather description.
Search by City Name: Users can search for weather info by entering the name of any city.
Simple and Clean Interface: Easy-to-use and responsive UI for better user experience.
Error Handling: Displays appropriate messages when the city is not found or if there's any issue fetching the data.
Tech Stack
HTML5: Structure of the application.
CSS3: Styling the components and ensuring responsiveness.
JavaScript (Vanilla): Handling the API calls and updating the UI with real-time data.
OpenWeather API: Used for fetching weather data.
How to Use
Visit the live demo: Weather API Live Demo.
Enter the name of a city in the search box.
Click on the "Search" button or press Enter.
View the current weather conditions for the city including temperature, humidity, wind speed, and weather description.
Installation
To run the project locally, follow these steps:

Clone this repository:
bash
Copy
git clone https://github.com/13sudhanshu/Weather-Api.git
Open the project folder.
Open index.html in your preferred browser.
No additional setup is required as it is a static web application.

API Key
This project uses the OpenWeather API to fetch weather data. To use the API, you will need an API key.

Visit OpenWeather API and create an account.
Generate your own API key.
Replace the API key in the script of index.js (or wherever the API call is made).
javascript
Copy
const apiKey = "YOUR_API_KEY";
Contributing
Fork this repository.
Create a new branch (git checkout -b feature-branch).
Make your changes.
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature-branch).
Create a new Pull Request.
License
This project is open-source and available under the MIT License.

Acknowledgments
OpenWeather for providing the weather data API.
Bootstrap for helping with responsive design.
Icons from FontAwesome for better UI elements.
