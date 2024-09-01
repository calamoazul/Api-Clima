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
import { renderIndex, renderLogin } from './params/auth.js';
const router = express.Router();


const {secret_key} = useConfig();

router.get('/', (req, res) => {
    try {
        res.render('index', renderIndex )
    }
    catch(error){
        console.error(error);
    }
})


router.get('/login', (req, res) => {
    try {
        res.render('login', renderLogin)
    }
    catch(error){
        res.status(500)
    }
})

router.post('/login', async (req, res) => {
   
        const {userName, email, password} = await req.body.json()
        const credentials = {userName, email, password};
        authController.login(credentials, ((login) => {
        
            const token = jwt.sign({user:userName}, secret_key, {expiresIn: 60 *60});
            res.cookie('Bearer:', token)
            console.log('token', token);
            return res.status(200).json({message: "Credenciales Correctas", token: token});
        }, err => {
            return res.status(401).json({message: 'Credenciales Incorrectas'});
        }))
    })

router.post('/register', async (req, res) => {
    const {userName, email, password} = await req?.body
    const dataUser = {userName, email, password};
    authController.registerUser(dataUser, (result => {
        const user = result.resolve();
        res.send(200).json({user: user})
    }, error => {
        res.status(400).json({message: 'Error en el registro'})
    }))
})
export default router;