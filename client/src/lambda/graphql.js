import { RESTDataSource } from 'apollo-datasource-rest';
const { ApolloServer, gql } = require('apollo-server-lambda');

const ACCESS_KEY = '259d2c48833cbd2615be7c5978f8ac8c';
const API_URL = 'https://api.openweathermap.org/data/2.5/';

export class WeatherAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = API_URL;
  }

  willSendRequest(request) {
    request.params.set('appid', ACCESS_KEY);
    request.params.set('units', 'metric');
  }

  async withCoords(lat, lon) {
    const data = await this.get('weather', { lat: lon });
    return data;
  }

  async withCity(city) {
    const data = await this.get('weather', { q: city });
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
    weatherByCoords(_, { lat, lon }, { dataSources }) {
      return dataSources.weatherAPI.withCoords(lat, lon);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ weatherAPI: new WeatherAPI() }),
  introspection: true,
  playground: true,
});

exports.handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});
