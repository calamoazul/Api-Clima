'use strict'




import httpGeocoding from '../Services/GeocodingService.js';

class GeocodingController {

    constructor(http){
        this.http = http;
    }
    
    /**
     * 
     * @param {Number} coord 
     * @returns Number
     */
    round_coordinates(coord){
        return Math.floor(coord * 10000) / 10000;
    }

    async getInfoCity(dataWiki){
        const {query} = dataWiki
        const dataCity = Object.values(query.pages)[0]
        const {title, coordinates, thumbnail, description} = dataCity
        const {lat, lon} = coordinates[0]
        
        const location = {
            name: title,
            description: description,
            lat: this.round_coordinates(lat),
            long: this.round_coordinates(lon),
            image: thumbnail.source
        }

        return location;
    }

    async getLocation(city){

       
       
       try {
        const response = await this.http.get('',{
            params: {
                titles: city
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

