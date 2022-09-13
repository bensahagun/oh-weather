import { gql } from "@apollo/client";

export const GET_WEATHER = gql`
  query ($city: String!) {
    weatherByCity(city: $city) {
      name
      weather {
        main
        description
      }
      temp
      country
    }
  }
`;

export const GET_WEATHER_BY_COORDS = gql`
  query ($lat: Float!, $lon: Float!) {
    weatherByCoords(lat: $lat, lon: $lon) {
      name
      weather {
        main
        description
      }
      temp
      country
    }
  }
`;
