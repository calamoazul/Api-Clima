"use strict";

/**
 * @author Óscar Hernández
 * @copyright 2024
 * @license GPL-3.0
 * @version 1.0.0
 */
import useConfig from '../config.js';
import axios from 'axios';
import Qs from 'qs';

/**
 * Dirección de la api de OpenWeather y api_key
 * @const string
 */
const {api_weather, api_key} = useConfig();

const dt = Math.floor(Date.now() / 1000);
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
    withCredentials: false,
    responseEncoding: 'utf8',
    responseType: 'json',
    params: {
        exclude: "minutely",
        units: 'metric',
        lang: 'es',
        dt: dt,
        appid: api_key
    },
    paramsSerializer: function (params) {
        return Qs.stringify(params, {arrayFormat: 'brackets'})
    },
});




export default httpWeather;