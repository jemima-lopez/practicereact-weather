import { LoadingButton } from "@mui/lab";
import { Box, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";

const API_WEATHER =
  "http://api.weatherstack.com/current?access_key=9e99fd7782f71778f19351a1c5454006&query=";

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
    temperature: 0,
    icon: "",
    conditionText: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault(); // Corregido
    setError({ error: false, message: "" });
    setLoading(true);

    try {
      if (!city.trim()) throw { message: "City is required" };

      const res = await fetch(`${API_WEATHER}${city}`);
      const data = await res.json();

      if (data.error) {
        throw { message: data.error.info };
      }

      setWeather({
        city: data.location.name,
        country: data.location.country,
        temperature: data.current.temperature, // Ajustado
        icon: data.current.weather_icons[0], // Ajustado
        conditionText: data.current.weather_descriptions[0], // Ajustado
      });
    } catch (error) {
      setError({ error: true, message: error.message || "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{ mt: 8 }}
      style={{
        width: "600px",
        height: "500px",
        borderRadius: "8px",
        backgroundColor: "rgba(255, 255, 255, 0.015)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Weather App
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
          loading={loading}
          loadingIndicator="loading..."
        >
          Search
        </LoadingButton>
      </Box>

      {weather.city && (
        <Box
          sx={{
            mt: 2,
            display: "grid",
            gap: 2,
            textAlign: "center",
            
          }}
        >
          <Typography variant="h4" component="h2">
            {weather.city}, {weather.country}
          </Typography>
          <Box
            component="img"
            alt={weather.conditionText}
            src={weather.icon}
            sx={{ margin: "0 auto" }}
          />
          <Typography variant="h5" component="h3" >
            {weather.temperature} °C
          </Typography>
          <Typography variant="h6" component="h4">
            {weather.conditionText}
          </Typography>
        </Box>
      )}

      <Typography textAlign="center" sx={{ mt: 2, fontSize: 10 }}>
        Power by{" "}
        <a href="https://weatherstack.com/" title="Weather API">
          weatherstack.com
        </a>
      </Typography>
    </Container>
  );
}