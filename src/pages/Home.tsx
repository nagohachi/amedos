import {
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Container,
  Hidden,
} from "@mui/material";
import fetchLocationFromKeyword from "../util/weather/fetchLocationFromKeyword";
import { useEffect, useState } from "react";
import fetchWeatherFromLocation from "../util/weather/fetchWeatherFromLocation";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "styled-components";

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

function WeatherForecast({ hourDataArray }: { hourDataArray: HourData[] }) {
  return (
    (hourDataArray || []).map((hourData, index) => (
      <Box
        key={index}
        sx={{
          display: { xs: "flex", sm: "block", md: "block" },
          textAlign: "center",
        }}
      >
        <div>
          {new Date(hourData.time).getHours()}
          <Hidden smUp>時</Hidden>
        </div>
        <Box
          component="img"
          src={hourData.condition.icon}
          alt={hourData.condition.text}
          sx={{
            width: { xs: "40px", sm: "auto", md: "100%" },
          }}
        />
        <div>{hourData.chance_of_rain} %</div>
      </Box>
    )) || []
  );
}

export default function Home({ darkMode, searchKeyword }: HomeProps) {
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
        setWeather(
          await fetchWeatherFromLocation({
            lat: location.lat,
            lng: location.lng,
          })
        );
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
            <Box
              sx={{
                display: { xs: "block", sm: "none", md: "none" },
              }}
            >
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  今日の天気
                </AccordionSummary>
                <AccordionDetails>
                  <WeatherForecast
                    hourDataArray={weather.forecast.forecastday[0].hour}
                  />
                </AccordionDetails>
              </Accordion>
            </Box>

            <Box
              sx={{
                display: { xs: "none", sm: "block", md: "block" },
              }}
            >
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
                  hourDataArray={weather.forecast.forecastday[0].hour}
                />
              </Container>
            </Box>
          </>
        )}
    </>
  );
}
