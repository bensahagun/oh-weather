import { IWeather } from './Weather';

const Emoji = ({ weather }: { weather: IWeather }): React.ReactElement => {
  let emoji = '';

  switch (weather?.weather?.main.toLowerCase()) {
    case 'clouds':
      emoji = '☁';
      break;
    case 'rain':
      emoji = '🌧';
      break;
    case 'snow':
      emoji = '❄';
      break;
    case 'clear':
      emoji = '🌞';
      break;
    case 'fog':
    case 'dirzzle':
      emoji = '🌫';
      break;
    case 'haze':
    case 'mist':
    case 'smoke':
      emoji = '🌥';
      break;
    default:
      emoji = '🌈';
      break;
  }

  return <span data-testid='emoji'>{emoji}</span>;
};

export default Emoji;
