import { MethodResponse, ResponseStatusCode } from "../types/common";
import axios from "axios";

export class WeatherController {
  public static async getWeatherStats(city: string): Promise<MethodResponse> {
    try {
      var settings = {
        url:
          "http://api.weatherstack.com/current?access_key=7c993391f5248d9e441596e4808136f0&query=" +
          city,
        config: {
          method: "GET",
          timeout: 0,
          headers: {
            "Cookie": "__cfduid=dde248925e46d9f5f7f2631019a1e9da41588689244"
          }
        },
      };
      const result = await axios(settings);
      console.log("Here..... result" , JSON.stringify(result.data as string));
      if (!result) {
        return new MethodResponse(ResponseStatusCode.Okay, "okay", {
          weatherStats: [],
        });
      } else {
        return new MethodResponse(ResponseStatusCode.Okay, "okay", {
          weatherStats: result,
        });
      }
    } catch (error: any) {
      return new MethodResponse(
        ResponseStatusCode.InternalError,
        error.message
      );
    }
  }
}
