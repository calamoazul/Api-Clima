#!/usr/bin/env/node

import { styleText} from "util";
import dataBase from "../database.js";



try {

    dataBase.reset((result => {
        result.resolve();
       
    }, error => {
        Promise.reject(error)
    }))
    console.log(styleText(["bgBlueBright", "white"], "Base de datos borrada"))
}
catch(error){
    console.error(styleText(["bgRedBrigth", "white"], error.message))
}