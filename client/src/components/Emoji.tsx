import { WeatherClass } from "./Weather";

const Emoji = ({ name }: { name: WeatherClass }) => {
  let emoji = "";

  switch (name.toLowerCase()) {
    case "clouds":
      emoji = "☁";
      break;
    case "rain":
      emoji = "🌧";
      break;
    case "snow":
      emoji = "❄";
      break;
    case "clear":
      emoji = "🌞";
      break;
    case "fog":
    case "drizzle":
      emoji = "🌫";
      break;
    case "haze":
    case "mist":
    case "smoke":
      emoji = "🌥";
      break;
    case "rainbow":
    default:
      emoji = "🌈";
      break;
  }

  return <span data-testid='emoji'>{emoji}</span>;
};

export default Emoji;
