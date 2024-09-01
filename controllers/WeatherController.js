'use strict'

import httpWeather from "../Services/WeatherService.js";

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
        return current
    }

}
const weatherController = new WeatherService(httpWeather);


export default weatherController;