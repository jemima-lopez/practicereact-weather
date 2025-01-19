import { LoadingButton } from "@mui/lab";
import { Box, Container, TextField, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { useState } from "react";

const API_WEATHER =
  "https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_APP_WEATHER_API_KEY}&q=${city}";

export default function App() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDeFault();
    console.log("submit");
    setLoading(true);
    try {
      if (!city.trim()) throw { message: "City is required" };
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 2 }}>
      <Typography variant="h3" component={"h1"} align="center" gutterBottom>
        Wheather App
      </Typography>
      <Box
        sx={{ display: "grid", gap: 2 }}
        component="form"
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <TextField
          id="city"
          label="City"
          variant="outlined"
          size="small"
          required
          fullWidth
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <LoadingButton
          type="submit"
          variant="contained"
          sx={{ color: "white", "&:hover": { backgroundColor: green[700] } }}
          loading={loading}
          loadingIndicator="loading..."
          fullWidth
        >
          Search
        </LoadingButton>
      </Box>
      <Typography textAlign={"center"} sx={{ mt: 2, fontSize: 10 }}>
        Power by{" "}
        <a href="https://www.weatherapi.com/" title="Weathert API">
          WeatherAPI.com
        </a>
      </Typography>
    </Container>
  );
}
