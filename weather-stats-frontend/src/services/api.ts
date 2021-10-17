import axios from "axios";

export const getWeatherStats = (city: string) => {
  return axios.post("/getWeatherStats", { city: city });
};