'use strict'
import server from './server.js';
import useConfig from './config.js';
const {host, port} = useConfig()


server.listen(port, host, () => {
    console.log(`App funcionando en puerto ${port} y en dominio ${host}`)
})

