'use strict'
import app from './server.js';

import citys from './routers/city.js';
import auths from './routers/auth.js'



app.use('/city', citys);
app.use('/', auths);


export default app;