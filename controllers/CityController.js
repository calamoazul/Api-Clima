import geocodingController from './GeocodingController.js';
import weatherController   from './WeatherController.js';

class CityController {

    constructor(geocoding, weather){
       this.geocoding = geocoding;
       this.weather = weather;
    }

    async getDataCity(city)
    {
        const location = await this.getLocationCity(city);
        const weather = await this.getWeatherCity(location);

        const dataCity = {
            ...location,
            ...weather
        }

        return dataCity;
    } 

    async getLocationCity(city){
        try {

            const location = await this.geocoding.getLocation(city);
            return location

        }
        catch(error){
            console.error(error);
        }
    }

    async getWeatherCity({lat, long}){
        
        try {
            const weather = await this.weather.getWeather(long, lat) 
            return weather;
        }
        catch(error) {
            console.error(error);
        }
    }
}

const cityController = new CityController(geocodingController, weatherController);

export default cityController