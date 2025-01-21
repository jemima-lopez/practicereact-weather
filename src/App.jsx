import { LoadingButton } from "@mui/lab";
import { Box, Container, TextField, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { useState } from "react";
import { data } from "react-router-dom";

const API_WEATHER =
  "https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&q=";

export default function App() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    error: false,
    message: "",
  });
  const [weather, setWeather] = useState({
    city: "",
    country: "",
    temp: "",
    condition: "",
    icon: "",
    conditinoText: "",
  });

  const onSubmit = async (e) => {
    e.preventDeFault();
    setLoading(true);
    setError({ error: false, message: "" });

    try {
      if (!city.trim()) throw { message: "City is required" };
      const response = await fetch(`${API_WEATHER}${city}`);
      const data = await response.json();
      if (data.error) throw { message: data.error.message };

      setWeather({
        city: data.location.name,
    country: data.location.country,
    temp: data.current.temp_c,
    condition: data.current.condition.text,
    icon: data.current.condition.icon,
    conditinoText: data.current.condition.text,
  });
    } catch (error) {
      setError({ error: true, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container
        maxWidth="xs"
        sx={{ mt: 8 }}
        style={{
          width: "500px",
          height: "300px",
          borderRadius: "8px",
          backgroundColor: "rgba(255, 255, 255, 0.015)", // Fondo semitransparente
          backdropFilter: "blur(10px)", // Aplicar desenfoque
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Sombra
        }}
      >
        <Typography variant="h3" component="h1" align="center" gutterBottom>
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
            error={error.error}
            helperText={error.message}
          />
          <LoadingButton
            type="submit"
            variant="contained"
            sx={{
              color: "white",
              "&:hover": { backgroundColor: green[700] },
            }}
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
    </>
  );
}
