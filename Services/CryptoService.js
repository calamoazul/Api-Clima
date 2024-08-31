/**
 * @author Óscar Hernández
 * @copyright 2024
 * @license GPL-3.0
 * @version 1.0.0
 */

import bcrypt, { compare } from 'bcrypt';


const CryptoService = () => {

    const hashPassword = (password, done) => {
        bcrypt.hash(password, 10, done )
    }

    const comparePassword = (plainPassword, hashPassword, done) => {
        bcrypt.compare(plainPassword, hashPassword, done);
    }

    return {
        hashPassword,
        comparePassword
    }
}

export default CryptoService;

