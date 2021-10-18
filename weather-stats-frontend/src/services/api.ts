import axios from "axios";

export const getWeatherStats = (city: string) => {
  return axios.post("/weather/getWeatherStats", { city: city });
};
