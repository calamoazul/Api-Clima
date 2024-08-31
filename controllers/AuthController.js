'use strict'

/**
 * @author Óscar Hernández
 * @copyright 2024
 * @license GPL-3.0
 * @version 1.0.0
 * 
 */

import database from '../database.js';

import useCrypto from '../Services/CryptoService.js';

const {compareHashword} = useCrypto();

class AuthController {

    constructor(database){
        this.db = database
    }

    login = (credentials, done) => {

        const {userName, password, email} = credentials;

        const user = {userName, password, email};

        return this.checkCredentials(user, done)
        }

    checkCredentials = (user, done) => {
        this.db.queryUser(user, (query => {
            const user = query.resolve();
            const hashPassword = user.password
            const {password} = user
            return compareHashword(password, hashPassword, done)
        }, err))
    };

    registerUser = (user, done) => {

        return this.db.createUser(user, done)

    }
}

const authController = new AuthController(database);

export default authController;