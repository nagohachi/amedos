import { Box, Hidden } from "@mui/material";
import { Typography } from "@mui/material";

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
  return (
    <>
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
            display: { xs: "flex", sm: "block", md: "block" },
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
