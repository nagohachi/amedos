async function fetchWeatherFromLocation({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}) {
  const FETCH_WEATHER_API_KEY = import.meta.env.VITE_FETCH_WEATHER_API_KEY;
  console.log("lat", lat, "lng", lng);
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${FETCH_WEATHER_API_KEY}&q=${lat},${lng}&days=3&aqi=no&alerts=yes`
  );
  const data = await response.json();
  return data;
}

export default fetchWeatherFromLocation;
