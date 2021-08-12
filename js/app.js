const cityForm = document.querySelector('[data-js="change-location"]');

const getWeatherInfo = async city => {
    const [{ Key,  LocalizedName }] = await getCityData(city);
    const [{ WeatherText, Temperature, IsDayTime, WeatherIcon }] = await getCityWeather(Key);
    return { IsDayTime, WeatherText, LocalizedName, WeatherIcon, Temperature };
}

const setDayOrNightBackground = IsDayTime => {
    const bg = document.querySelector('[data-js="bg"]');
    const timeImg = document.querySelector('[data-js="time"]');
    const timeImgSrc = IsDayTime ? './src/day.svg' : './src/night.svg';
    const bgTime = IsDayTime ? 'day-bg' : 'night-bg';
    
    bg.classList.remove(...bg.classList)
    bg.classList.add('bg', bgTime);
    timeImg.src = timeImgSrc;
}

const addIconOnContainer = WeatherIcon => {
    const timeIconContainer = document.querySelector('[data-js="time-icon"]');
    const timeIcon = `<img src="./src/icons/${WeatherIcon}.svg">`;
    
    timeIconContainer.textContent = '';
    timeIconContainer.insertAdjacentHTML('afterbegin', timeIcon);
}

const showOrHideContainer = () => {
    const cityCardContainer = document.querySelector('[data-js="city-card"]');
    const isHidden = cityCardContainer.classList.contains('d-none');
    
    if (isHidden) {
        cityCardContainer.classList.add('d-block');
    }
    
}

const showCityWeather = async city => {
    const { IsDayTime, WeatherIcon, LocalizedName, WeatherText, Temperature } = await getWeatherInfo(city)
    const cityNameContainer = document.querySelector('[data-js="city-name"]');
    const cityWeatherContainer = document.querySelector('[data-js="city-weather"]');
    const cityTemperatureContainer = document.querySelector('[data-js="city-temperature"]');
    
    cityNameContainer.textContent = LocalizedName;
    cityWeatherContainer.textContent = WeatherText;
    cityTemperatureContainer.textContent = Temperature.Metric.Value;
    setDayOrNightBackground(IsDayTime);
    addIconOnContainer(WeatherIcon);
    showOrHideContainer();
}

const loadStorageCity = () => {
    const cityName = localStorage.getItem('city');

    if (cityName) {
        showCityWeather(cityName);
    }
}

loadStorageCity();

cityForm.addEventListener('submit', event => {
    event.preventDefault();
    const inputValue = event.target.city.value;

    localStorage.setItem('city', inputValue);
    showCityWeather(inputValue);
    event.target.reset();
});