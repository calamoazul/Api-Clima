'use strict';

import express from 'express';
import ejs from 'ejs';
import path from 'path';
import {fileURLToPath} from 'url';
import useConfig from './config.js';

const {host, port} = useConfig()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.engine('.html', ejs.renderFile);
app.set("views", path.join(__dirname, 'views'));
app.set('view engine', 'html')
app.use('/assets', express.static(path.join(__dirname, 'public')))

app.listen(port, host, () => {
    console.log(`App funcionando en puerto ${port} y en dominio ${host}`)
})


export default app;

