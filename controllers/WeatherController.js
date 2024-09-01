'use strict'

/**
 * @author Óscar Hernández
 * @copyright 2024
 * @license GPL-3.0
 * @version 1.0.0
 * 
 */


import httpWeather from "../Services/WeatherService.js";
import DateService from "../Services/DateService.js";

const {formatFullDate, formatHourDate} = DateService()

class WeatherService {

    constructor(http){
        this.http = http;
    }

    async getWeather(lon, lat){
        const response = await this.http.get('' ,{
            params: {
                lat: lat,
                lon: lon
            }
        });
       
        const dataWeather = await response.data
        const {current} = dataWeather
        return {
            description: current.weather[0].description,
            localDate: formatFullDate(current.dt),
            sunrise: formatHourDate(current.sunrise),
            sunset: formatHourDate(current.sunset),
            temp: current.temp+'&#8451;',
            feels_like: current.feels_like+'&#8451;',
            pressure: current.pressure,
            wind_speed: current.wind_speed,
            wind_deg: current.wind_deg,
            humidity: current.humidity,
            dew_point: current.dew_point+'&#8451;',
            clouds: current.clouds
        }
    }

}
const weatherController = new WeatherService(httpWeather);


export default weatherController;