import { Box, Hidden } from "@mui/material";

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
