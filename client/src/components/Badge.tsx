import React from 'react';
import { Image } from '@chakra-ui/react';

const Badge = (): React.ReactElement => {
  return (
    <a href='https://github.com/bensahagun/oh-weather/' target='_blank' rel='noreferrer'>
      <Image
        background='#fff'
        p={1}
        position='absolute'
        bottom={5}
        right={5}
        boxSize='50'
        borderRadius={5}
        objectFit='cover'
        src={process.env.PUBLIC_URL + '/github.png'}
        name='Ben Sahagun'
      />
    </a>
  );
};

export default Badge;
