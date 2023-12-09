import fetchLocationFromKeyword from "../util/fetchLocationFromKeyword";
import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";

interface HomeProps {
  darkMode: boolean;
  searchKeyword?: string;
}

export default function Home({ darkMode, searchKeyword }: HomeProps) {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!searchKeyword) return;
    const fetchLocation = async () => {
      setLoading(true);
      try {
        // ありがたみを味わわせるために、0,8 秒遅延させる
        await new Promise((resolve) => setTimeout(resolve, 800));
        const location = await fetchLocationFromKeyword(searchKeyword);
        setLocation(location);
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
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
      {errorMessage !== "" && <p>{errorMessage}</p>}
      {!loading && searchKeyword && (
        <p>
          {searchKeyword}の緯度経度は、{location.lat}、{location.lng}です。
        </p>
      )}
    </>
  );
}
