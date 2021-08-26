
const APIkey = '7my7eSx84opeDxGvKvFS0QF8zAKTIUBa';

const baseUrl = 'https://dataservice.accuweather.com';

const getCityUrl = cityName =>
    `${baseUrl}/locations/v1/cities/search?apikey=${APIkey}&q=${cityName}`;

const getWeatherUrl = cityKey =>
    `${baseUrl}/currentconditions/v1/${cityKey}?apikey=${APIkey}&language=pt-br`;

const requestAPI = async url => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Não foi possível receber os dados!');
        }

        return response.json();
    } catch ({ name, message }) {
        console.log(`${name}: ${message}`);
    }
}

const getCityData = cityName => requestAPI(getCityUrl(cityName));
const getCityWeather = cityKey => requestAPI(getWeatherUrl(cityKey))
