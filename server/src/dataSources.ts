import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";

const ACCESS_KEY = process.env.OPENWEATHER_API_KEY as string;
const API_URL = "https://api.openweathermap.org/data/2.5/";

export class WeatherAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = API_URL;
  }

  willSendRequest(request: RequestOptions) {
    request.params.set("appid", ACCESS_KEY);
    request.params.set("units", "metric");
  }

  async withCoords(lat: number, lon: number) {
    const data = await this.get("weather", { lat, lon });
    return data;
  }

  async withCity(city: string) {
    const data = await this.get("weather", { q: city });
    return { ...data, weather: data.weather[0] };
  }
}

export const dataSources = () => ({ weatherAPI: new WeatherAPI() });
