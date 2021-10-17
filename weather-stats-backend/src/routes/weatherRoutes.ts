import { Router } from 'express';
import { WeatherController } from '../controllers/weatherController';

export const weatherRouter: Router = Router();

weatherRouter.post("/getWeatherStats",
    async (request, response) => {
        let city = request.body.city;
        console.log("here..........")
        let controllerResponse = await WeatherController.getWeatherStats(city)
        response
            .status(controllerResponse.status)
            .send({
                responseMessage: controllerResponse.responseMessage,
                payload: controllerResponse.payload
            })
    }
)