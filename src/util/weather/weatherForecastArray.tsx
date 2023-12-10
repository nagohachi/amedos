import { Box, Button, Hidden } from "@mui/material";
import { useState } from "react";

interface HourData {
  time: string;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  chance_of_rain: number;
}

export default function WeatherForecast({
  hourDataArray,
}: {
  hourDataArray: HourData[];
}) {
  const [showAll, setShowAll] = useState(false);

  return (
    <>
      <Hidden smUp>
        <Button onClick={() => setShowAll(!showAll)}>
          {showAll ? "3時間ごとに表示" : "1時間ごとに表示"}
        </Button>
      </Hidden>
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          textAlign: "center",
          justifyContent: { xs: "space-around" },
          alignItems: { xs: "center" },
        }}
      >
        <h4>時刻</h4>
        <h4>天気</h4>
        <h4>降水確率</h4>
      </Box>
      {(hourDataArray || []).map((hourData, index) => (
        <Box
          key={index}
          sx={{
            display: {
              xs: showAll || index % 3 === 0 ? "flex" : "none",
              sm: "block",
              md: "block",
            },
            textAlign: "center",
            justifyContent: { xs: "space-around" },
            alignItems: { xs: "center" },
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
              width: { xs: "80px", sm: "auto", md: "100%" },
            }}
          />
          <div>{hourData.chance_of_rain} %</div>
        </Box>
      )) || []}
    </>
  );
}
