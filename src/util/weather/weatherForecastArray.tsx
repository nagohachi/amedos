import { Box, Button, Hidden, Tooltip } from "@mui/material";
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

function getWeatherCondition(hourData: HourData) {
  if (
    hourData.condition.text.includes("cloud") ||
    hourData.condition.text.includes("Overcast")
  ) {
    return "焚き火して雲さんにぶぶ漬け届けたりましょ";
  } else if (hourData.chance_of_rain > 50) {
    return "蛙さんが好きそうな天気どすなあ、私らのお化粧に文句でもあるんやろか";
  } else {
    return "カラッとしてお肌が粉ォ吹きそうどす、お天道さんええ加減にしいや";
  }
}

export default function WeatherForecast({
  hourDataArray,
}: {
  hourDataArray: HourData[];
}) {
  const [showAll, setShowAll] = useState(false);
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <>
      <Hidden smUp>
        <Button
          onClick={() => setShowAll(!showAll)}
          sx={{
            border: "1px solid #beb8cc",
            color: "inherit",
            fontFamily: "inherit",
          }}
        >
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
          <Tooltip title={hover ? getWeatherCondition(hourData) : ""}>
            <Box
              component="img"
              src={hourData.condition.icon}
              alt={hourData.condition.text}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleMouseEnter}
              onTouchEnd={handleMouseLeave}
              sx={{
                width: { xs: "80px", sm: "auto", md: "100%" },
              }}
            />
          </Tooltip>
          <div>{hourData.chance_of_rain} %</div>
        </Box>
      )) || []}
    </>
  );
}
