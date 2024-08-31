import express from 'express';
import cityController from '../controllers/CityController.js'



const router = express.Router();


router.get('/:city', async (req, res) => {
    const city = req.params.city
    try { 
        const response = await cityController.getDataCity(city);
        return res.send(response)
       
    }

    catch(error){
        console.error(error)
    }
})



export default router;