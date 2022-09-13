import { gql, IResolvers, makeExecutableSchema } from "apollo-server";

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

const resolvers: IResolvers = {
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

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
