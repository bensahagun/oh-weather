import React, { useState, useEffect } from 'react';
import { Center, ChakraProvider, Container, Collapse, Heading } from '@chakra-ui/react';
import { useLazyQuery, gql } from '@apollo/client';
import _ from 'lodash';
import theme from './theme';
import '@fontsource/raleway';
import '@fontsource/raleway/500.css';
import '@fontsource/raleway/600.css';
import '@fontsource/raleway/800.css';
import '@fontsource/raleway/900.css';
import Emoji from './components/Emoji';
import Form from './components/Form';
import Weather from './components/Weather';
import Wallpaper from './components/Wallpaper';
import { IWeather } from './components/Weather';
import Badge from './components/Badge';

interface IWeatherResponse {
  weatherByCity: IWeather;
}

const GET_WEATHER = gql`
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

const App = () => {
  const [query, setQuery] = useState<string>('');
  const [weather, setWeather] = useState<IWeather>({} as IWeather);
  const [getWeather, { loading, data }] = useLazyQuery<IWeatherResponse>(GET_WEATHER);

  useEffect(() => {
    if (query) {
      getWeather({
        variables: {
          city: query,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    if (data) {
      setWeather(data.weatherByCity);
    }
  }, [data]);

  return (
    <ChakraProvider theme={theme}>
      <Wallpaper weather={weather}>
        <Container>
          <Center mb={6}>
            <Heading
              fontWeight='800'
              fontSize={{ base: '4xl', md: '6xl' }}
              textShadow='4px 4px 2px rgba(0, 0, 0, 0.5);'>
              Oh! Weather <Emoji weather={weather} />
            </Heading>
          </Center>
          <Form setQuery={setQuery} />
          <Collapse in={!_.isEmpty(weather) && !loading}>
            {!_.isEmpty(weather) && <Weather weather={weather} />}
          </Collapse>
          <Badge />
        </Container>
      </Wallpaper>
    </ChakraProvider>
  );
};

export default App;
