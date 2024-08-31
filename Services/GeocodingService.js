/**
 * @author Óscar Hernández
 * @copyright 2024
 * @license GPL-3.0
 * @version 1.0.0
 */

import axios from 'axios';
import useConfig from '../config.js';

const {api_wiki} = useConfig();

const httpGeocoding = axios.create({
    baseURL: api_wiki,
    method: 'get',
    headers: {
        "Accept": 'application/json',
        "Content-Type": "application/x-www-form-urlencoded"
    },
    withCredentials: true,
    withXSRFToken: true,
    responseType: 'json',
    responseEncoding: 'utf8',
    params: {
        action: 'query',
        prop: 'coordinates|pageimages|description',
        format: 'json',
        origin: '*'
    },
    timeout: 3000,
    validateStatus: (status) => {
        return status >= 200 < 300;
    }
})

httpGeocoding.interceptors.request.use((config) => {

    const token = localStorage.getItem('Bearer')
    if(token){
        config.headers.Authorization = 'Bearer:' + Json.parse(token);
    }
    return config;
}, err => {
    return Promise.reject(err)
})


export default httpGeocoding;