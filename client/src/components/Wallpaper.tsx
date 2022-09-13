import React, { useEffect } from "react";
import { Flex, Box } from "@chakra-ui/react";
import { WeatherType } from "./Weather";

type Props = {
  weather: WeatherType | undefined;
  wallpaper?: string;
  children?: React.ReactNode;
};

const getWallpaperURL = (filename: string) => {
  return `/images/${filename?.toLowerCase()}.jpg`;
};

const Wallpaper = ({ weather, children }: Props): React.ReactElement => {
  //preload images
  useEffect(() => {
    ["clear", "clouds", "drizzle", "fog", "rain", "snow", "mist", "smoke", "haze"].forEach((i) => {
      const img = new Image();
      img.src = getWallpaperURL(i);
    });
  }, []);

  return (
    <Box
      data-testid='wallpaper'
      backgroundImage={weather ? getWallpaperURL(weather.weather.main) : `/images/default.jpg`}
      backgroundSize='cover'
      backgroundPosition='center'
      transition='background-image 0.3s linear'
    >
      <Flex height='100vh' alignItems='center' justifyContent='center'>
        {children}
      </Flex>
    </Box>
  );
};

export default Wallpaper;
