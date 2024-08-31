import express from 'express';

const router = express.Router();

import {year} from '../Services/DateService.js';

router.get('/', (req, res) => {
    try {
        res.render('index', {
            title: 'Api Clima',
            hello: 'Hola',
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

router.route('/login')
    .get((req, res) => {
        res.send('Login Route')
    })

export default router;