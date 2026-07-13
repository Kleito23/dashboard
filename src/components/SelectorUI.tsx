import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface SelectorUIProps {
  cityInput: string;
  onCityChange: (city: string) => void;
}

export default function SelectorUI({ cityInput, onCityChange }: SelectorUIProps) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onCityChange(event.target.value);
  };

  const cityLabel = cityInput ? cityInput.charAt(0).toUpperCase() + cityInput.slice(1) : '';

  return (
    <FormControl fullWidth>
      <InputLabel id="city-select-label">Ciudad</InputLabel>
      <Select
        labelId="city-select-label"
        id="city-simple-select"
        label="Ciudad"
        value={cityInput}
        onChange={handleChange}>
        <MenuItem disabled><em>Seleccione una ciudad</em></MenuItem>
        <MenuItem value={"guayaquil"}>Guayaquil</MenuItem>
        <MenuItem value={"quito"}>Quito</MenuItem>
        <MenuItem value={"manta"}>Manta</MenuItem>
        <MenuItem value={"cuenca"}>Cuenca</MenuItem>
      </Select>

      {cityInput && (
        <p>
          Información del clima en <strong>{cityLabel}</strong>
        </p>
      )}

    </FormControl>
  )
}