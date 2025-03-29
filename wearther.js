const container = document.querySelector('.conatiner');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIKey = '9e1ac06a6f72dc48dc80d70b4f040583';
    const city = document.querySelector('.search-box input').value;

    if (city == '')
        return;
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

        if (json.cod == '404') {
            document.querySelector('.container').style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        document.querySelector('.container').style.height = '555px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        const image = document.querySelector('.weather-box img');
        const temp = document.querySelector('.weather-box .temp');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'https://i.postimg.cc/wvpb8hGV/clear.png'
                break;
            case 'Rain':
                image.src = 'https://i.postimg.cc/50SKxXcM/rain.png'
                break;
            case 'Snow':
                image.src = 'https://i.postimg.cc/SRQTjmqY/snow.png'
                break;
            case 'Clouds':
                image.src = 'https://i.postimg.cc/NfJV92Ks/cloud.png'
                break;
            case 'Mist':
                image.src = 'https://i.postimg.cc/j2887Bdg/mist.png'
                break;
            case 'Haze':
                image.src = 'https://i.postimg.cc/j2887Bdg/mist.png'
                break;
        
            default:
                image.src = 'https://i.postimg.cc/NfJV92Ks/cloud.png';
        }

        temp.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
    });
});
