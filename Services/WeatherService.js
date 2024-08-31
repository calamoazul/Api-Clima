/**
 * @author Óscar Hernández
 * @copyright 2024
 * @license GPL-3.0
 * @version 1.0.0
 */
import useConfig from '../config.js';
import axios from 'axios';


/**
 * Dirección de la api de OpenWeather y api_key
 * @const string
 */
const {api_weather, api_key} = useConfig();

/**
 * Petición personalizada para la api de OpenWeather
 * @returns AxiosInstance
 */
const httpWeather = axios.create({
    baseURL: api_weather,
    method: 'get',
    timeout: 3000,
    header:
    {
        'Accept': 'application/json',
        "Content-Type": "application/x-www-form-urlencoded"
    },
    withXSRFToken: true,
    withCredentials: true,
    responseEncoding: 'utf8',
    params: {
        exclude: "hourly,daily,minutely",
        unit: 'metric',
        lang: 'es',
        appid: api_key
    }
});

httpWeather.interceptors.request.use((config) => {
    const token = localStorage.getItem('Bearer');
    if(token){
        const dt = Date.now() / 1000;
        config.params['dt'] = dt;
        config.headers.Authorization = 'Bearer' + JSON.parse(token)
    }
    return config;
}, err => {
    return Promise.reject(err);
})


export default httpWeather;