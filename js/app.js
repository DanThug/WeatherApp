const cityForm = document.querySelector('[data-js="change-location"]');

const getWeatherInfos = async event => {
    const inputValue = event.target.city.value;
    const [{ Key,  LocalizedName }] = await getCityData(inputValue);
    const [{ WeatherText, Temperature, IsDayTime, WeatherIcon }] = await getCityWeather(Key);
    
    setDayOrNightBackground(IsDayTime);
    showOrHideContainer();
    addIconOnContainer(WeatherIcon);
    addWeatherInfoOnContainer(LocalizedName, WeatherText, Temperature.Metric);
}

const showOrHideContainer = () => {
    const cityCardContainer = document.querySelector('[data-js="city-card"]');
    const isHidden = cityCardContainer.classList.contains('d-none');
    const showCityCardContainer = isHidden ? 'd-block' : 'd-none';

    cityCardContainer.classList.add(showCityCardContainer);
}

const addIconOnContainer = WeatherIcon => {
    const timeIconContainer = document.querySelector('[data-js="time-icon"]');
    const timeIcon = `<img src="./src/icons/${WeatherIcon}.svg">`;
    
    timeIconContainer.textContent = '';
    timeIconContainer.insertAdjacentHTML('afterbegin', timeIcon);
}

const setDayOrNightBackground = IsDayTime => {
    const bg = document.querySelector('.bg');
    const timeImg = document.querySelector('[data-js="time"]');
    const timeImgSrc = IsDayTime ? './src/day.svg' : './src/night.svg';
    const bgTime = IsDayTime ? 'day-bg' : 'night-bg';
    
    bg.classList.remove(...bg.classList)
    bg.classList.add('bg', bgTime);
    timeImg.src = timeImgSrc;
}

const addWeatherInfoOnContainer = (LocalizedName, WeatherText, Metric) => {
    const cityNameContainer = document.querySelector('[data-js="city-name"]');
    const cityWeatherContainer = document.querySelector('[data-js="city-weather"]');
    const cityTemperatureContainer = document.querySelector('[data-js="city-temperature"]');
    
    cityNameContainer.textContent = LocalizedName;
    cityWeatherContainer.textContent = WeatherText;
    cityTemperatureContainer.textContent = Metric.Value;
    
}


cityForm.addEventListener('submit', event => {
    event.preventDefault();

    getWeatherInfos(event);
    event.target.reset();
});