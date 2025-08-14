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
  Button,
  Alert
} from '@mui/material';

function App() {
  const [country, setCountry] = useState('');
  const [province, setProvince] = useState('');
  const [values, setValues] = useState({
    text: '',
    password: '',
    email: '',
    number: '',
    tel: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const newErrors = {};
    if (!values.text) newErrors.text = 'Texto es requerido';
    else if (values.text.length < 3) newErrors.text = 'Mínimo 3 caracteres';

    if (!values.password) newErrors.password = 'Contraseña requerida';
    else if (values.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';

    if (!values.email) newErrors.email = 'Email requerido';
    else if (!/\S+@\S+\.\S+/.test(values.email)) newErrors.email = 'Email inválido';

    if (!values.number) newErrors.number = 'Número requerido';
    else if (isNaN(Number(values.number))) newErrors.number = 'Debe ser numérico';

    if (!values.tel) newErrors.tel = 'Teléfono requerido';
    else if (!/^\d{10}$/.test(values.tel)) newErrors.tel = '10 dígitos';

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      setSuccess(false);
      return;
    }
    setErrors({});
    setSuccess(true);
    const data = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(data.entries());
    localStorage.setItem('formData', JSON.stringify(formValues));
    console.log(formValues);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Formulario
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              ¡Formulario enviado con éxito!
            </Alert>
          )}
          <Typography variant="caption" color="text.secondary">
            Regla: mínimo 3 caracteres
          </Typography>
          <TextField
            label="Texto"
            name="text"
            fullWidth
            margin="normal"
            value={values.text}
            onChange={handleChange}
            error={Boolean(errors.text)}
            helperText={errors.text}
          />
          <Typography variant="caption" color="text.secondary">
            Regla: mínimo 6 caracteres
          </Typography>
          <TextField
            label="Contraseña"
            type="password"
            name="password"
            fullWidth
            margin="normal"
            value={values.password}
            onChange={handleChange}
            error={Boolean(errors.password)}
            helperText={errors.password}
          />
          <Typography variant="caption" color="text.secondary">
            Regla: formato email válido
          </Typography>
          <TextField
            label="Email"
            type="email"
            name="email"
            fullWidth
            margin="normal"
            value={values.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
          <Typography variant="caption" color="text.secondary">
            Regla: debe ser numérico
          </Typography>
          <TextField
            label="Número"
            type="number"
            name="number"
            fullWidth
            margin="normal"
            value={values.number}
            onChange={handleChange}
            error={Boolean(errors.number)}
            helperText={errors.number}
          />
          <Typography variant="caption" color="text.secondary">
            Regla: 10 dígitos
          </Typography>
          <TextField
            label="Teléfono"
            type="tel"
            name="tel"
            fullWidth
            margin="normal"
            value={values.tel}
            onChange={handleChange}
            error={Boolean(errors.tel)}
            helperText={errors.tel}
          />
          <TextField
            label="Fecha"
            type="date"
            name="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Hora"
            type="time"
            name="time"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Color"
            type="color"
            name="color"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

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
