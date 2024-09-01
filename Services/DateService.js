"use strict";

/**
 * @author Óscar Hernández
 * @copyright 2024
 * @license GPL-3.0
 * @version 1.0.0
 */


/**
 * Servicio que guarda las funciones relacionadas con formateo de fechas
 * 
 */
const DateService = () => {

    const optionsFormat = {day: 'numeric', month:'long', year: 'numeric'};
    const lang = 'es-ES';

    /**
     * Función para formatear tiempo en formato Unix a formato de fecha local
     * @param {number} unixTime Tiempo en milisegundos
     * @returns {Date} Fecha local
     */
    const formatDate = (unixTime) => {
        const time = unixTime * 1000;
        const date = new Date(time);
        return date
    } 

    /**
     * Función para formatear la fecha local
     * @param {Date} date Fecha actual
     * @returns {string} Fecha local formateada
     */
    const formatLocalDate = (date) => {
        const localDate = date.toLocaleDateString(lang, optionsFormat);
        return localDate
    }

    /**
     * Función para formatear la fecha en formato local con todos los datos
     * @param {number} unixTime en Milisegundos
     * @returns {string} Fecha local completa
     */
    const formatFullDate = (unixTime) => {
        
        const date = formatDate(unixTime)
        const localDate = formatLocalDate(date);

        const hours = getLocalHours(date);
        const minutes = getLocalMinutes(date);

        return `${localDate} ${hours}:${minutes}`; 
    }

    /**
     * Función para formatear fecha en unixtime en formato de hora y minutos locales
     * @param {number} unixTime Tiempo en milisegundos
     * @returns {string} Fecha formateada en hora y minutos locales
     */
    const formatHourDate = (unixTime) => {

        const date = formatDate(unixTime)

        const hour = getLocalHours(date);
        const minutes = getLocalMinutes(date);

        return `${hour}:${minutes}`

    }

    /**
     * Función para obtener los minutos de una hora local
     * @param {Date} date 
     * @returns {number} Minutos en fecha local
     */
    const getLocalMinutes = (date) => {
        return date.getMinutes();
    }

    /**
     * Función para obtener la hora de una fecha local
     * @param {Date} localDate 
     * @returns {number} Horas en fecha local
     */
    const getLocalHours = (date) => {
        return date.getHours()
    }

    /**
     * Función para obtener el año actual
     * @returns {number} Año actual
     */
    const year = () => {

        const date = new Date();

        const year = date.getFullYear()

        return year;
    }

    return {
        formatFullDate,
        formatHourDate,
        year
    }
}

export default DateService;