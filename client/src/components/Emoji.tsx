import { IWeather } from './Weather';

const Emoji = ({ weather }: { weather: IWeather }) => {
  switch (weather?.weather?.main.toLowerCase()) {
    case 'clouds':
      return <>☁</>;
    case 'rain':
      return <>🌧</>;
    case 'snow':
      return <>❄</>;
    case 'clear':
      return <>🌞</>;
    case 'fog':
    case 'dirzzle':
      return <>🌫</>;
    case 'haze':
    case 'mist':
    case 'smoke':
      return <>🌥</>;
    default:
      return <>🌈</>;
  }
};

export default Emoji;
