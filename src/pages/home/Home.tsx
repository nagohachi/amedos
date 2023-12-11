import {
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Container,
} from "@mui/material";
import { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import fetchLocationFromKeyword from "../../util/weather/fetchLocationFromKeyword";
import fetchWeatherFromLocation from "../../util/weather/fetchWeatherFromLocation";
import WeatherForecast from "../../util/weather/weatherForecastArray";

interface HomeProps {
  searchKeyword?: string;
}

export default function Home({ searchKeyword }: HomeProps) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [locationStr, setLocationStr] = useState("");
  const [weather, setWeather] = useState({} as any);
  const days = ["今日の天気", "明日の天気", "明後日の天気"];

  useEffect(() => {
    if (!searchKeyword) return;
    const fetchLocation = async () => {
      setLoading(true);
      try {
        // ありがたみを味わわせるために、0.5 秒遅延させる
        await new Promise((resolve) => setTimeout(resolve, 500));
        const location = await fetchLocationFromKeyword(searchKeyword);
        const weather = await fetchWeatherFromLocation({
          lat: location.y._text,
          lng: location.x._text,
        });
        setLocationStr(location.prefecture._text + location.city._text);
        setWeather(weather);
        setErrorMessage("");
      } catch (err) {
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
    <Box
      sx={{
        padding: {
          xs: "0 10px",
          sm: "0 20px",
          md: "0 30px",
          lg: "0 40px",
          xl: "0 50px",
        },
      }}
    >
      {errorMessage !== "" && <p>{errorMessage}</p>}
      {loading && (
        <Box
          sx={{ display: "flex", justifyContent: "center", paddingTop: "10px" }}
        >
          <CircularProgress />
        </Box>
      )}
      {!loading &&
        (searchKeyword === undefined || searchKeyword.length === 0) && (
          <h3>日本の市町村名などを入力し、検索してください。</h3>
        )}
      {searchKeyword !== undefined &&
        searchKeyword.length > 0 &&
        errorMessage === "" &&
        weather.location !== undefined &&
        !loading && (
          <>
            <h3>「{locationStr}」の 3 日間の天気予報どす。</h3>
            <Box
              sx={{
                display: { xs: "block", sm: "none", md: "none" },
              }}
            >
              {days.map((day, index) => (
                <Accordion key={index}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <h4>{day}</h4>
                  </AccordionSummary>
                  <AccordionDetails>
                    <WeatherForecast
                      hourDataArray={weather.forecast.forecastday[index].hour}
                    />
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>

            <Box
              sx={{
                display: { xs: "none", sm: "block", md: "block" },
              }}
            >
              {days.map((day, index) => (
                <>
                  <Box key={index}>
                    <h4>{day}</h4>
                  </Box>
                  <Container
                    maxWidth={false}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      overflow: "auto",
                    }}
                  >
                    <WeatherForecast
                      hourDataArray={weather.forecast.forecastday[index].hour}
                    />
                  </Container>
                </>
              )) || []}
            </Box>
          </>
        )}
    </Box>
  );
}
