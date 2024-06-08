import { format } from 'date-fns';
import { weatherDataCached } from './processData';

class UI {
	static generateAll(weatherData) {
		this.clearDivs();
		this.generateQueryInfo(weatherData);
		this.generateCurrentWeather(weatherData);
		this.generateForecast(weatherData);
	}

	static generateQueryInfo(weatherData) {
		const timeAndDateArray = weatherData.queryInfo.date.split(' ');
		const location = `${weatherData.queryInfo.city} - ${weatherData.queryInfo.region} - ${weatherData.queryInfo.country}`;
		const time = timeAndDateArray[1];
		const date = timeAndDateArray[0];
		const currentDiv = document.getElementById('currentDiv');

		const html = `
      <div id="queryInfo">
        <div id="currentTimeDiv">
        ${date} @ ${time}
        </div>
        <div id="currentDateDiv">
          <i class="bi bi-pin-map"></i>
        ${location}
        </div>
      </div>`;

		currentDiv.innerHTML += html;
	}

	static generateCurrentWeather(weatherData) {
		const currentDiv = document.getElementById('currentDiv');
		const unitsSettings = this.getUnitsValue();
		let unitsObject = null;
		let unitsTextHtml = null;
		switch (unitsSettings) {
			case '°C':
				unitsObject = weatherData.celsiusData.todayInfo;
				unitsTextHtml = '°C';
				break;

			case '°F':
				unitsObject = weatherData.farenheitData.todayInfo;
				unitsTextHtml = '°F';
				break;

			default:
				unitsObject = weatherData.celsiusData.todayInfo;
				break;
		}

		const condition = unitsObject.condition;
		const conditionIcon = this.generateCoditionIcon(condition);
		const humidity = unitsObject.humidity;
		const wind = unitsObject.wind;
		const temp = unitsObject.temp;
		const maxTemp = unitsObject.maxTemp;
		const minTemp = unitsObject.minTemp;
		const chanceOfRain = unitsObject.chanceOfRain;

		const html = `
      <div id="currentMinMaxInfo">
        <div id="currentMin" class="bi bi-thermometer-low">
${minTemp + unitsTextHtml}
        </div>

        <div id="currentMax" class="bi bi-thermometer-high">
${maxTemp + unitsTextHtml}
        </div>
      </div>
      <div id="currentWeather">
        <div id="currentAvg" class='${conditionIcon}'>
${temp + unitsTextHtml}
        </div>

        <div id="currentCondition">
${condition}
        </div>
      </div>
      <div id="currentExtraInfo">
        <div id="currentWind" class="bi bi-wind">
    ${wind}km/h
        </div>
        <div id="currentHumidity" class="bi bi-moisture">
${humidity}%
        </div>
        <div id="currentRainChance" class="bi bi-umbrella-fill">
${chanceOfRain}%
        </div>
`;

		currentDiv.innerHTML += html;
	}

	static generateForecast(weatherData) {
		const forecastDataDiv = document.getElementById('forecastDataDiv');
		const unitsSettings = this.getUnitsValue();
		let unitsObject = null;
		switch (unitsSettings) {
			case '°C':
				unitsObject = weatherData.celsiusData;
				break;

			case '°F':
				unitsObject = weatherData.farenheitData;
				break;

			default:
				unitsObject = weatherData.celsiusData;
				break;
		}

		const initialHtml = `
    <div id="forecastTitle" class="bi bi-calendar3-week-fill">
      3-Day Forecast
    </div>
`;

		const dayOneForecast = new forecastObject(
			unitsObject.dayTwoInfo,
		).generateHtml();
		const dayTwoForecast = new forecastObject(
			unitsObject.dayThreeInfo,
		).generateHtml();
		const dayThreeForecast = new forecastObject(
			unitsObject.dayFourInfo,
		).generateHtml();

		forecastDataDiv.innerHTML +=
			initialHtml + dayOneForecast + dayTwoForecast + dayThreeForecast;
	}

	static generateError(errorMessage) {
		this.clearDivs();
		const currentDiv = document.getElementById('currentDiv');
		const html = `
      <div id="errorMessage">
      ${errorMessage}
      </div >`;
		currentDiv.innerHTML += html;
	}

	static clearDivs() {
		const currentDiv = document.getElementById('currentDiv');
		const forecastDataDiv = document.getElementById('forecastDataDiv');
		currentDiv.innerHTML = '';
		forecastDataDiv.innerHTML = '';
	}

	static getUnitsValue() {
		const buttonUnits = document.getElementById('buttonUnits');
		return buttonUnits.textContent;
	}

	static changeUnitsButttonDisplay() {
		const buttonUnits = document.getElementById('buttonUnits');
		switch (buttonUnits.textContent) {
			case '°C':
				buttonUnits.textContent = '°F';
				break;

			case '°F':
				buttonUnits.textContent = '°C';
				break;

			default:
				buttonUnits.textContent = '°C';
				break;
		}
	}

	static generateCoditionIcon(conditionText) {
		const conditionIconObject = {
			//Clear Or Sunny
			Sunny: 'bi bi-sun-fill',
			Clear: 'bi bi-stars',
			Cloudy: 'bi bi-cloud-fill',
			'Partly cloudy': 'bi bi-cloud-fill',
			Overcast: 'bi bi-cloud-fill',
			Mist: 'bi bi-cloud-fog',
			Fog: 'bi bi-cloud-fog2-fill',
			//Snowy
			'Patchy snow possible': 'bi bi-cloud-snow-fill',
			'Patchy sleet possible': 'bi bi-cloud-snow-fill',
			'Patchy freezing drizzle possible': 'bi bi-cloud-snow-fill',
			'Heavy freezing drizzle possible': 'bi bi-cloud-snow-fill',
			'Blowing snow': 'bi bi-snow3',
			'Freezing Fog': 'bi bi-cloud-fog2-fill',
			Blizzard: 'bi bi-cloud-sleet-fill',
			//Rain
			'Patchy rain possible': 'bi bi-cloud-drizzle-fill',
			'Patchy light rain possible': 'bi bi-cloud-drizzle-fill',
			'Patchy light drizzle': 'bi bi-cloud-drizzle-fill',
			'Light drizzle': 'bi bi-cloud-drizzle-fill',
			'Moderate rain at times': 'bi bi-cloud-rain-fill',
			'Moderate rain': 'bi bi-cloud-rain-fill',
			'Heavy rain': 'bi bi-cloud-rain-heavy-fill',
			'Heavy rain at times': 'bi bi-cloud-rain-heavy-fill',
			'Freezing drizzle': 'bi bi-cloud-drizzle-fill',
			//Storm
			'Thundery outbreaks possible': 'bi bi-cloud-lightning-fill',
			'Light freezing rain': 'bi bi-cloud-snow-fill',
			'Moderate or heavy freezing rain': 'bi bi-cloud-snow-fill',
			'Light sleet': 'bi bi-cloud-snow-fill',
			'Moderate or heavy sleet': 'bi bi-cloud-snow-fill',
			'Patchy light snow': 'bi bi-cloud-snow-fill',
			'Light snow': 'bi bi-cloud-snow-fill',
			'Patchy moderate snow': 'bi bi-cloud-snow-fill',
			'Moderate snow': 'bi bi-cloud-snow-fill',
			'Patchy heavy snow': 'bi bi-cloud-snow-fill',
			'Heavy snow': 'bi bi-cloud-snow-fill',
			'Ice pellets': 'bi bi-cloud-hail-fill',
			'Light rain shower': 'bi bi-cloud-rain-fill',
			'Moderate or heavy rain shower': 'bi bi-cloud-rain-fill',
			'Torrential rain shower': 'bi bi-cloud-rain-fill',
			'Light sleet showers': 'bi bi-cloud-rain-fill',
			'Moderate or heavy sleet showers': 'bi bi-cloud-rain-fill',
			'Light snow showers': 'bi bi-cloud-snow-fill',
			'Moderate or heavy snow showers': 'bi bi-cloud-snow-fill',
			'Light showers of ice pellets': 'bi bi-cloud-hail-fill',
			'Moderate or heavy showers of ice pellets': 'bi bi-cloud-hail-fill',
			'Patchy light rain with thunder': 'bi bi-cloud-lightning-rain-fill',
			'Moderate or heavy rain with thunder': 'bi bi-cloud-lightning-rain-fill',
			'Patchy light snow with thunder': 'bi bi-cloud-lightning-rain-fill',
			'Moderate or heavy snow with thunder': 'bi bi-cloud-lightning-rain-fill',
		};

		if (conditionIconObject[conditionText]) {
			return `${conditionIconObject[conditionText]}`;
		} else {
			return 'bi bi-cloud-fill';
		}
	}
}

//TODO: Create a forecast constructor to reduce code size
class forecastObject {
	constructor(day) {
		this.dayCss = day.dayCss;
		this.condition = day.condition;
		this.conditionIcon = UI.generateCoditionIcon(this.condition);
		this.temp = day.temp;
		this.minTemp = day.minTemp;
		this.maxTemp = day.maxTemp;
		this.date = this.getDate(day.date);
		this.unitsTextHtml = UI.getUnitsValue();
	}

	getDate(date) {
		const weekDay = format(date, 'EEEE dd/MM/yyyy');
		return weekDay;
	}

	generateHtml() {
		const html = `
    <div id="${this.dayCss}Forecast">
      <div id="${this.dayCss}Date">
${this.date}
      </div>

      <div id="${this.dayCss}Avg" class="${this.conditionIcon}">
${this.temp}${this.unitsTextHtml}
      </div>
      <div id="${this.dayCss}MinMax">
        <i class="bi bi-arrow-down-short"></i>
${this.minTemp}${this.unitsTextHtml}

        <i class="bi bi-arrow-up-short"></i>
${this.maxTemp}${this.unitsTextHtml}

      </div>
    </div>
`;
		return html;
	}
}

class loadComponent {
	static createLoadingScreen() {
		const loadingHtml = `
<div id='loadingData'>
	<i class="bi bi-hourglass-split"></i>
	</div>
`;
		const searchDiv = document.getElementById('searchDiv');
		searchDiv.insertAdjacentHTML('afterend', loadingHtml);
	}

	static removeLoading() {
		const loadingDataDiv = document.getElementById('loadingData');
		loadingDataDiv.remove();
	}
}

class uiLogic {
	static buttonUnitsChange() {
		const buttonUnits = document.getElementById('buttonUnits');
		buttonUnits.addEventListener('click', function () {
			UI.changeUnitsButttonDisplay();
			if (
				weatherDataCached[0] === null ||
				weatherDataCached[0] === '' ||
				weatherDataCached[0] === undefined
			) {
				return;
			} else {
				UI.generateAll(weatherDataCached[0]);
			}
		});
	}
}

export { uiLogic, loadComponent, UI };
