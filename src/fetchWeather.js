import { processData } from './processData';

export default async function fetchWeatherData(query) {
	try {
		const response = await fetch(
			`https://api.weatherapi.com/v1/forecast.json?key=96fbdce48ecd470ab9a205838241605&q=${query}&aqi=yes&days=6&alerts=no`,
			{
				mode: 'cors',
			},
		);
		const weatherData = await response.json();
		console.log(weatherData);
		return processData(weatherData);
	} catch (error) {
		console.error(error);
	}
}
