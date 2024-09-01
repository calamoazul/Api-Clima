"use strict"
/**
 * @author Óscar Hernández
 * @copyright 2024
 * @license GPL-3.0
 * @version 1.0.0
 */

import axios from 'axios';
import useConfig from '../config.js';
import Qs from 'qs';
const {api_wiki} = useConfig();

const httpGeocoding = axios.create({
    baseURL: api_wiki,
    method: 'get',
    headers: {
        "Accept": 'application/json',
        'content-type': 'application/x-www-form-urlencoded'
    },
    withCredentials: false,
    withXSRFToken: true,
    responseType: 'json',
    responseEncoding: 'utf8',
    params: {
        action: 'query',
        prop: 'coordinates|pageimages|description',
        format: 'json',
        origin: '*'
    },
    paramsSerializer: function (params) {
        return Qs.stringify(params, {arrayFormat: 'brackets'})
      },
    timeout: 3000,
    validateStatus: (status) => {
        return status >= 200 < 300;
    }
})




export default httpGeocoding;