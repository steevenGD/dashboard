import { useRef } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface ControlWeatherProps {
  onChange: (index: number) => void;
}

export default function ControlWeather({ onChange }: ControlWeatherProps) {
  const descriptionRef = useRef<HTMLDivElement>(null);
  const items = [
    { name: 'Precipitación', description: 'Cantidad de agua que cae sobre una superficie en un período específico.' },
    { name: 'Humedad', description: 'Cantidad de vapor de agua presente en el aire, generalmente expresada como un porcentaje.' },
    { name: 'Nubosidad', description: 'Grado de cobertura del cielo por nubes, afectando la visibilidad y la cantidad de luz solar recibida.' },
  ];

  const handleChange = (event: SelectChangeEvent) => {
    const idx = parseInt(event.target.value);
    if (descriptionRef.current != null) {
      descriptionRef.current.innerHTML = idx >= 0 ? items[idx].description : '';
    }
    onChange(idx); // Propaga el cambio al componente padre
  };

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <Typography mb={2} component="h3" variant="h6" color="primary">
        Variables Meteorológicas
      </Typography>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="simple-select-label">Variables</InputLabel>
          <Select
            labelId="simple-select-label"
            id="simple-select"
            defaultValue="-1"
            onChange={handleChange}
          >
            <MenuItem key="-1" value="-1" disabled>
              Seleccione una variable
            </MenuItem>
            {items.map((item, key) => (
              <MenuItem key={key} value={key}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Typography ref={descriptionRef} mt={2} component="p" color="text.secondary" />
    </Paper>
  );
}
