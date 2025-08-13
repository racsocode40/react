import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  Switch,
  Slider,
  Button
} from '@mui/material';

function App() {
  const [country, setCountry] = useState('');
  const [province, setProvince] = useState('');

  const provincesByCountry = {
    es: ['Madrid', 'Barcelona', 'Sevilla'],
    mx: ['Ciudad de México', 'Jalisco', 'Nuevo León'],
    ar: ['Buenos Aires', 'Córdoba', 'Santa Fe'],
  };

  const handleCountryChange = (event) => {
    const value = event.target.value;
    setCountry(value);
    setProvince('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data.entries());
    localStorage.setItem('formData', JSON.stringify(values));
    console.log(values);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Formulario
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
      <TextField label="Texto" name="text" fullWidth margin="normal" />
      <TextField label="Contraseña" type="password" name="password" fullWidth margin="normal" />
      <TextField label="Email" type="email" name="email" fullWidth margin="normal" />
      <TextField label="Número" type="number" name="number" fullWidth margin="normal" />
      <TextField label="Teléfono" type="tel" name="tel" fullWidth margin="normal" />
      <TextField label="Fecha" type="date" name="date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
      <TextField label="Hora" type="time" name="time" fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
      <TextField label="Color" type="color" name="color" fullWidth margin="normal" InputLabelProps={{ shrink: true }} />

      <FormControlLabel control={<Checkbox name="checkbox" />} label="Acepto" />

      <FormControl sx={{ mt: 2 }}>
        <FormLabel>Género</FormLabel>
        <RadioGroup row name="gender">
          <FormControlLabel value="male" control={<Radio />} label="Masculino" />
          <FormControlLabel value="female" control={<Radio />} label="Femenino" />
        </RadioGroup>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="select-country-label">País</InputLabel>
        <Select
          labelId="select-country-label"
          label="País"
          name="country"
          value={country}
          onChange={handleCountryChange}
        >
          <MenuItem value="es">España</MenuItem>
          <MenuItem value="mx">México</MenuItem>
          <MenuItem value="ar">Argentina</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal" disabled={!country}>
        <InputLabel id="select-province-label">Provincia</InputLabel>
        <Select
          labelId="select-province-label"
          label="Provincia"
          name="province"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
        >
          {country &&
            provincesByCountry[country].map((p) => (
              <MenuItem key={p} value={p}>
                {p}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <FormControlLabel control={<Switch name="switch" />} label="Activado" />

      <Box sx={{ width: 300, mt: 2 }}>
        <Slider defaultValue={30} name="slider" />
      </Box>

      <Button variant="contained" component="label" sx={{ mt: 2 }}>
        Subir archivo
        <input hidden type="file" name="file" />
      </Button>

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Enviar
      </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default App;
