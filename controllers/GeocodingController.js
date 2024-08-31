'use strict'

import config from '../config.js'


import httpGeocoding from '../Services/GeocodingService.js';

class GeocodingController {

    constructor(http){
        this.http = http;
    }
    
    async getInfoCity(dataWiki){
        const {query} = dataWiki
        const dataCity = Object.values(query.pages)[0]
        const {title, coordinates, thumbnail, description} = dataCity
        const {lat, lon} = coordinates[0]
        
        const location = {
            name: title,
            description: description,
            lat: lat,
            long: lon,
            image: thumbnail.source
        }

        return location;
    }

    async getLocation(city){

       
       
       try {
        const response = await this.http.get({
            params: {
                city: city
            }
        });
        const search = response.data
        const infoCity = this.getInfoCity(search)
        return infoCity;
       }
       catch(error){
        console.error
       }
       
    }
}

const geocodingController = new GeocodingController(httpGeocoding)

export default geocodingController

