import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { format } from "date-fns";

export type WeatherClass =
  | "clouds"
  | "rain"
  | "snow"
  | "clear"
  | "fog"
  | "drizzle"
  | "haze"
  | "mist"
  | "snow"
  | "rainbow";

export type WeatherType = {
  name: string;
  weather: {
    main: WeatherClass;
    description: string;
  };
  temp: number;
  country: string;
};

type Props = {
  weather: WeatherType;
};

const Weather = ({ weather }: Props) => {
  return (
    <Flex flexDirection='column' justifyContent='center' alignItems='center' py={8} px={4} mt={5} borderRadius={10}>
      <Heading as='h2' fontWeight='600' textShadow='2px 2px 2px rgba(0, 0, 0, 0.5);'>
        {weather.name}, {weather.country}
      </Heading>
      <Text mb={3} as='i' textShadow='1px 1px 1px rgba(0, 0, 0, 0.5);'>
        {format(new Date(), "EEEE, MMMM dd yyyy")}
      </Text>

      <Box py={10} px={6} backgroundColor='whiteAlpha.400' borderRadius={15} boxShadow='lg'>
        <Text mt={-3} lineHeight='1em' fontSize='70px' fontWeight='900' textShadow='4px 4px 2px rgba(0, 0, 0, 0.5);'>
          {weather.temp}°c
        </Text>
      </Box>

      <Heading as='i' fontWeight='800' mt={3} fontSize='48px' textShadow='4px 4px 2px rgba(0, 0, 0, 0.5);'>
        {weather.weather.main}
      </Heading>
    </Flex>
  );
};

export default Weather;
