'use strict';

import express from 'express';
import http from 'http';

import ejs from 'ejs';
import path from 'path';
import {fileURLToPath} from 'url';
import compression from 'compression';
import bodyParser from 'body-parser'
import rateLimit from 'express-rate-limit';
import citys from './routers/city.js';
import auths from './routers/auth.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express(); //Instancia de la app
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 10
})

/**
 * Renderizado de vistas
 */
app.engine('.html', ejs.renderFile);
app.set("views", path.join(__dirname, 'views'));
app.set('view engine', 'html')
app.use('/assets', express.static(path.join(__dirname, 'public')))

/** Peticiones al servidor */
app.use(bodyParser.json({extended: false}));
app.use(compression())
app.use(limiter)

/** Rutas */

app.use('/city', citys);
app.use('/', auths);

const server = http.createServer(app)

export default server;

