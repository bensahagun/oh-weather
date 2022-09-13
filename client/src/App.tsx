import "@fontsource/raleway";
import "@fontsource/raleway/500.css";
import "@fontsource/raleway/600.css";
import "@fontsource/raleway/800.css";
import "@fontsource/raleway/900.css";

import { useCallback, useEffect, useMemo, useState } from "react";

import { useLazyQuery } from "@apollo/client";
import { Center, ChakraProvider, Collapse, Container, Heading } from "@chakra-ui/react";

import Badge from "./components/Badge";
import Emoji from "./components/Emoji";
import Form from "./components/Form";
import Wallpaper from "./components/Wallpaper";
import Weather, { WeatherType } from "./components/Weather";
import { GET_WEATHER, GET_WEATHER_BY_COORDS } from "./grapqhl/schema";
import theme from "./theme";
import { useGeolocation } from "react-use";

type WeatherResponse = {
  weatherByCity?: WeatherType;
  weatherByCoords?: WeatherType;
};

const App = () => {
  const [getWeather, { loading, data }] = useLazyQuery<WeatherResponse, { city: string }>(GET_WEATHER);
  const [getWeatherByCoords, { data: data2 }] = useLazyQuery<WeatherResponse, { lat: number; lon: number }>(
    GET_WEATHER_BY_COORDS
  );
  const [gpsMode, setGpsMode] = useState(false);
  const { latitude, longitude } = useGeolocation();

  useEffect(() => {
    if (!latitude || !longitude) return;
    getWeatherByCoords({ variables: { lat: latitude, lon: longitude } });
  }, [latitude, longitude]);

  const handleFormSubmit = useCallback(
    (input: string) => {
      getWeather({ variables: { city: input } });
    },
    [getWeather]
  );

  const handleGPSClick = () => setGpsMode(!gpsMode);

  const weather = useMemo(() => {
    return (gpsMode ? data2?.weatherByCoords : data?.weatherByCity) as WeatherType;
  }, [data, data2, gpsMode]);

  return (
    <ChakraProvider theme={theme}>
      <Wallpaper weather={weather}>
        <Container>
          <Center mb={6}>
            <Heading
              data-testid='pageTitle'
              fontWeight='800'
              fontSize={{ base: "4xl", md: "6xl" }}
              textShadow='4px 4px 2px rgba(0, 0, 0, 0.5);'
            >
              Oh! Weather <Emoji name={weather ? weather.weather.main : "rainbow"} />
            </Heading>
          </Center>
          <Form handleFormSubmit={handleFormSubmit} handleGPSClick={handleGPSClick} gpsMode={gpsMode} />
          <Collapse data-testid='weather' in={!loading}>
            {weather && <Weather weather={weather} />}
          </Collapse>
          <Badge />
        </Container>
      </Wallpaper>
    </ChakraProvider>
  );
};

export default App;
