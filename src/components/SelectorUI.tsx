import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { CITY_OPTIONS, type CityKey } from '../types/DashboardTypes';

interface SelectorUIProps {
  cityInput: CityKey;
  onCityChange: (city: CityKey) => void;
}

export default function SelectorUI({ cityInput, onCityChange }: SelectorUIProps) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onCityChange(event.target.value as CityKey);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="city-select-label">Ciudad</InputLabel>
      <Select
        labelId="city-select-label"
        id="city-simple-select"
        label="Ciudad"
        value={cityInput}
        onChange={handleChange}>
        {Object.entries(CITY_OPTIONS).map(([key, option]) => (
          <MenuItem key={key} value={key}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

    </FormControl>
  )
}