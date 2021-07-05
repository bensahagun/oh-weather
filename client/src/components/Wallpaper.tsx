import React, { useEffect } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import _ from 'lodash';
import { IWeather } from './Weather';

interface IWallpaper {
  weather: IWeather;
  wallpaper?: string;
  children?: React.ReactChild | React.ReactChild[];
}

const getWallpaperURL = (filename: string) => {
  return `/images/${filename?.toLowerCase()}.jpg`;
};

const Wallpaper = ({ weather, children }: IWallpaper) => {
  //preload images
  useEffect(() => {
    ['clear', 'clouds', 'drizzle', 'fog', 'rain', 'snow', 'mist', 'smoke', 'haze'].forEach((i) => {
      const img = new Image();
      img.src = getWallpaperURL(i);
    });
  }, []);

  return (
    <Box
      backgroundImage={!_.isEmpty(weather) ? getWallpaperURL(weather.weather.main) : `/images/default.jpg`}
      backgroundSize='cover'
      backgroundPosition='center'
      transition='background-image 0.3s linear'>
      <Flex height='100vh' alignItems='center' justifyContent='center'>
        {children}
      </Flex>
    </Box>
  );
};

export default Wallpaper;
