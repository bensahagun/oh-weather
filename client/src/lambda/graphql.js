import { RESTDataSource } from "apollo-datasource-rest";
const { ApolloServer, gql } = require("apollo-server-lambda");

const ACCESS_KEY = process.env.OPENWEATHER_API_KEY;
const API_URL = "https://api.openweathermap.org/data/2.5/";

export class WeatherAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = API_URL;
  }

  willSendRequest(request) {
    request.params.set("appid", ACCESS_KEY);
    request.params.set("units", "metric");
  }

  async withCoords(lat, lon) {
    const data = await this.get("weather", { lat, lon });
    return data;
  }

  async withCity(city) {
    const data = await this.get("weather", { q: city });
    return { ...data, weather: data.weather[0] };
  }
}

const typeDefs = gql`
  type Coordinates {
    lon: Float
    lat: Float
  }

  type Weather {
    id: Int!
    main: String
    description: String
    icon: String
  }

  type WeatherResponse {
    id: String!
    name: String
    base: String
    coord: Coordinates
    temp: Int
    country: String
    weather: Weather!
  }

  type Query {
    weatherByCity(city: String!): WeatherResponse
    weatherByCoords(lat: Float!, lon: Float!): WeatherResponse
  }
`;

const resolvers = {
  Query: {
    async weatherByCity(_, { city }, { dataSources }) {
      const weather = await dataSources.weatherAPI.withCity(city);

      return { ...weather, temp: Math.floor(weather.main.temp), country: weather.sys.country };
    },
    async weatherByCoords(_, { lat, lon }, { dataSources }) {
      const weather = await dataSources.weatherAPI.withCoords(lat, lon);
      return { ...weather, temp: Math.floor(weather.main.temp), country: weather.sys.country };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ weatherAPI: new WeatherAPI() }),
  introspection: true,
  playground: false,
});

exports.handler = server.createHandler();
