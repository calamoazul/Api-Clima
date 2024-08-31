"use strict";

/**
 * @author Óscar Hernández
 * @copyright 2024
 * @license GPL-3.0
 * @version 1.0.0
 */

import bcrypt from 'bcrypt';

/**
 * Servicio para almacenar las funciones de criptografía
 *  
 */
const CryptoService = () => {

    /**
     * Función para Hashear la Password
     * @param {*} password 
     * @returns 
     */
    const hashPassword = async (password) => {
       
        try {
            return await bcrypt.hash(password, 10)
        }
        catch(error){
            console.error(error);
        }
    }

    /**
     * Función para comparar contraseñas
     * @param {*} plainPassword 
     * @param {*} hashPassword 
     * @param {*} done 
     */
    const comparePassword = (plainPassword, hashPassword, done) => {
        bcrypt.compare(plainPassword, hashPassword, done);
    }

    return {
        hashPassword,
        comparePassword
    }
}

export default CryptoService;

