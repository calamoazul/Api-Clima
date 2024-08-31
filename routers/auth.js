/**
 * @author Óscar Hernández
 * @copyright 2024
 * @license GPL-3.0
 * @version 1.0.0
 * 
 */


import express from 'express';

import authController from '../controllers/AuthController.js';
import useConfig from '../config.js';
import jwt from 'jsonwebtoken';
import {year} from '../Services/DateService.js';
const router = express.Router();

const {secret_key} = useConfig();

router.get('/', (req, res) => {
    try {
        res.render('index', {
            title: 'Api Clima',
            heading: 'Api Clima',
            description: 'Escribe el nombre de la ciudad para descubrir el tiempo de hoy',
            year: year(),
            company: 'Cálamo Azul'
        } )
    }
    catch(error){
        console.error(error);
    }
})

router.post('/login', async (req, res) => {
        //Comprobamos credenciales
        const {userName, email, password} = await req?.body.json()
        const credentials = {userName, email, password};
        authController.login(credentials, ((login) => {
            //Si son validas, generamos token y lo devolvenos.
            const token = jwt.sign({user:userName}, secret_key, {expiresIn: 60 *60});
            console.log(token);
            return res.status(200).json({token: token});
        }, err => {
            return res.status(401).json({message: 'Invalidad credentials'});
        }))
       


        // Si no, generamos error
        res.send('Login Route')
    })

router.post('/register', async (req, res) => {
    const {userName, email, password} = await req?.body.json()
    const dataUser = {userName, email, password};
    authController.registerUser(dataUser, (result => {
        const user = result.resolve();
        res.send(200).json({user: user})
    }, error => {
        res.status(400).json({message: 'Error en el registro'})
    }))
})
export default router;