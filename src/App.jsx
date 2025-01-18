import { Box, Container, TextField, Typography } from "@mui/material";

export default function App() {

  const onSubmit = (event) => { e.preventDeFault(); console.log("submit"); };

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
        />
      </Box>
    </Container>
  );
}
