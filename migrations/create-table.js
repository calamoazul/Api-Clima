#!/usr/bin/env/node

/**
 * @author Óscar Hernández
 * @copyright 2024
 * @license GPL-3.0
 * @version 1.0.0
 * 
 */


import { styleText } from "util";
import dataBase from "../database.js";




try {
    dataBase.initDatabase((res) => { 
       res.resolve()
    }, err => Promise.reject(err))
    console.log(styleText(["bgBlue", "white"], "Base de datos creada"));
}
catch(error){
    console.error(["bgRed", "white"], "Error: " + error.message);
}