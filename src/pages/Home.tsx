import fetchLocationFromKeyword from "../util/weather/fetchLocationFromKeyword";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
} from "@mui/material";
import fetchWeatherFromLocation from "../util/weather/fetchWeatherFromLocation";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface HomeProps {
  darkMode: boolean;
  searchKeyword?: string;
}

interface HourData {
  time: string;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  chance_of_rain: number;
}

export default function Home({ darkMode, searchKeyword }: HomeProps) {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [weather, setWeather] = useState({} as any);

  useEffect(() => {
    if (!searchKeyword) return;
    const fetchLocation = async () => {
      setLoading(true);
      try {
        // ありがたみを味わわせるために、0.8 秒遅延させる
        await new Promise((resolve) => setTimeout(resolve, 800));
        const location = await fetchLocationFromKeyword(searchKeyword);
        setLocation(location);
        setWeather(
          await fetchWeatherFromLocation({
            lat: location.lat,
            lng: location.lng,
          })
        );
        console.log("weather", weather);
        setErrorMessage("");
      } catch (err) {
        setLocation({ lat: 0, lng: 0 });
        if (err instanceof Error) {
          setErrorMessage(err.message);
        } else {
          setErrorMessage("不明なエラーが発生しました。");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchLocation();
  }, [searchKeyword]);

  return (
    <>
      <h1>ホーム</h1>
      {errorMessage !== "" && <p>{errorMessage}</p>}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
      {searchKeyword !== undefined &&
        searchKeyword.length > 0 &&
        !loading &&
        weather &&
        weather.forecast && (
          <>
            <p>{searchKeyword}の 3 日間の天気予報です。</p>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                今日
              </AccordionSummary>
              <AccordionDetails>
                {weather.forecast.forecastday[0].hour.map(
                  (hourData: HourData, index: number) => (
                    <div key={index}>
                      <p>Time: {hourData.time}</p>
                      <p>
                        Condition:
                        {JSON.stringify(hourData.condition.text, null, 2)}
                      </p>
                      <p>
                        <img
                          src={hourData.condition.icon}
                          alt={hourData.condition.text}
                        />
                      </p>
                      <p>Chance of rain: {hourData.chance_of_rain} %</p>
                      ------------------------
                    </div>
                  )
                )}
              </AccordionDetails>
            </Accordion>
          </>
        )}
    </>
  );
}
