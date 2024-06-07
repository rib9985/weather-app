const weatherDataCached = [];

function processData(weatherData) {
	const queryInfo = {
		country: weatherData.location.country,
		region: weatherData.location.region,
		city: weatherData.location.name,
		date: weatherData.current.last_updated,
	};
	const celsiusData = {
		todayInfo: {
			temp: weatherData.current.temp_c,
			condition: weatherData.current.condition.text,
			humidity: weatherData.current.humidity,
			wind: weatherData.current.wind_kph,
			minTemp: weatherData.forecast.forecastday[0].day.mintemp_c,
			maxTemp: weatherData.forecast.forecastday[0].day.maxtemp_c,
			chanceOfRain:
				weatherData.forecast.forecastday[0].day.daily_chance_of_rain,
		},
		dayTwoInfo: {
			date: weatherData.forecast.forecastday[1].date,
			minTemp: weatherData.forecast.forecastday[1].day.mintemp_c,
			maxTemp: weatherData.forecast.forecastday[1].day.maxtemp_c,
			temp: weatherData.forecast.forecastday[1].day.avgtemp_c,
			condition: weatherData.forecast.forecastday[1].day.condition.text,
		},
		dayThreeInfo: {
			date: weatherData.forecast.forecastday[2].date,
			minTemp: weatherData.forecast.forecastday[2].day.mintemp_c,
			maxTemp: weatherData.forecast.forecastday[2].day.maxtemp_c,
			temp: weatherData.forecast.forecastday[2].day.avgtemp_c,
			condition: weatherData.forecast.forecastday[2].day.condition.text,
		},
		dayFourInfo: {
			date: weatherData.forecast.forecastday[3].date,
			minTemp: weatherData.forecast.forecastday[3].day.mintemp_c,
			maxTemp: weatherData.forecast.forecastday[3].day.maxtemp_c,
			temp: weatherData.forecast.forecastday[3].day.avgtemp_c,
			condition: weatherData.forecast.forecastday[3].day.condition.text,
		},
	};
	const farenheitData = {
		todayInfo: {
			temp: weatherData.current.temp_f,
			condition: weatherData.current.condition.text,
			humidity: weatherData.current.humidity,
			wind: weatherData.current.wind_kph,
			minTemp: weatherData.forecast.forecastday[0].day.mintemp_f,
			maxTemp: weatherData.forecast.forecastday[0].day.maxtemp_f,
			chanceOfRain:
				weatherData.forecast.forecastday[0].day.daily_chance_of_rain,
		},
		dayTwoInfo: {
			date: weatherData.forecast.forecastday[1].date,
			minTemp: weatherData.forecast.forecastday[1].day.mintemp_f,
			maxTemp: weatherData.forecast.forecastday[1].day.maxtemp_f,
			temp: weatherData.forecast.forecastday[1].day.avgtemp_f,
			condition: weatherData.forecast.forecastday[1].day.condition.text,
		},
		dayThreeInfo: {
			date: weatherData.forecast.forecastday[2].date,
			minTemp: weatherData.forecast.forecastday[2].day.mintemp_f,
			maxTemp: weatherData.forecast.forecastday[2].day.maxtemp_f,
			temp: weatherData.forecast.forecastday[2].day.avgtemp_f,
			condition: weatherData.forecast.forecastday[2].day.condition.text,
		},
		dayFourInfo: {
			date: weatherData.forecast.forecastday[3].date,
			minTemp: weatherData.forecast.forecastday[3].day.mintemp_f,
			maxTemp: weatherData.forecast.forecastday[3].day.maxtemp_f,
			temp: weatherData.forecast.forecastday[3].day.avgtemp_f,
			condition: weatherData.forecast.forecastday[3].day.condition.text,
		},
	};

	const aggregateData = {
		queryInfo,
		farenheitData,
		celsiusData,
	};
	weatherDataCached[0] = aggregateData;
	console.log(weatherDataCached[0]);
	return aggregateData;
}

export { processData, weatherDataCached };
