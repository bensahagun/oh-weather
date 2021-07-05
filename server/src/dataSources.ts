import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';

const ACCESS_KEY = '259d2c48833cbd2615be7c5978f8ac8c';
const API_URL = 'https://api.openweathermap.org/data/2.5/';

export class WeatherAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = API_URL;
  }

  willSendRequest(request: RequestOptions) {
    request.params.set('appid', ACCESS_KEY);
    request.params.set('units', 'metric');
  }

  async withCoords(lat: number, lon: number) {
    const data = await this.get('weather', { lat: lon });
    return data;
  }

  async withCity(city: string) {
    const data = await this.get('weather', { q: city });
    return { ...data, weather: data.weather[0] };
  }
}

export const dataSources = () => ({ weatherAPI: new WeatherAPI() });
