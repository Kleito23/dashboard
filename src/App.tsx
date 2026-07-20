import HeaderUI from './components/HeaderUI';
import './App.css'
import { Card, CardContent, Grid, Typography } from '@mui/material';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './hooks/useFetchData';
import { useState } from 'react';
import type { CityKey } from './types/DashboardTypes';
import { CITY_OPTIONS } from './types/DashboardTypes';
import WeatherChartUI from './components/WeatherChartUI';
import ForecastTableUI, { type ForecastRow } from './components/ForecastTableUI';


function App() {
    const [cityInput, setCityInput] = useState<CityKey>('guayaquil');
    const { data, loading, error } = useFetchData(cityInput);

    const selectedCity = CITY_OPTIONS[cityInput];
    const hourlyData = data?.hourly;
    const hourlyUnits = data?.hourly_units;

    const temperature2mValue = hourlyData?.temperature_2m[0];
    const temperature2mUnit = hourlyUnits?.temperature_2m ?? '';
    const apparentTemperatureValue = hourlyData?.apparent_temperature[0];
    const apparentTemperatureUnit = hourlyUnits?.apparent_temperature ?? '';
    const windSpeedValue = hourlyData?.wind_speed_10m[0];
    const windSpeedUnit = hourlyUnits?.wind_speed_10m ?? '';
    const humidityValue = hourlyData?.relative_humidity_2m[0];
    const humidityUnit = hourlyUnits?.relative_humidity_2m ?? '';

    const forecastRows: ForecastRow[] = (hourlyData?.time ?? []).slice(0, 6).map((time, index) => ({
        time: new Intl.DateTimeFormat('es-EC', {
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(time)),
        temperature: hourlyData?.temperature_2m[index] ?? 0,
        humidity: hourlyData?.relative_humidity_2m[index] ?? 0,
        windSpeed: hourlyData?.wind_speed_10m[index] ?? 0,
    }));

    const chartLabels = (hourlyData?.time ?? []).slice(0, 6).map((time) => new Intl.DateTimeFormat('es-EC', {
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(time)));

    const temperatureValues = (hourlyData?.temperature_2m ?? []).slice(0, 6);

  return (
    <Grid container spacing={3} sx={{ justifyContent: 'left', alignItems: 'stretch', p: { xs: 2, md: 4 } }}>

         {/* Encabezado */}
         <Grid size={{ xs: 12 }}>
             <HeaderUI/>
         </Grid>

         {/* Alertas */}
         <Grid container sx={{ justifyContent: 'right', alignItems: 'center' }} size={{ xs: 12 }}>
             <AlertUI
                 description={loading ? `Cargando clima de ${selectedCity.label}...` : error ? error : `Datos actualizados para ${selectedCity.label}`}
                 severity={error ? 'error' : loading ? 'info' : 'success'}
             />
</Grid>

         {/* Selector */}
         <Grid size={{ xs: 12, md: 3 }}>
             <Card sx={{ height: '100%' }}>
                 <CardContent>
                     <SelectorUI cityInput={cityInput} onCityChange={setCityInput}/>
                     <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
                         Selecciona una ciudad para actualizar la API y refrescar todo el dashboard.
                     </Typography>
                 </CardContent>
             </Card>
         </Grid>

        {/* Indicadores */}
        <Grid container size={{ xs: 12, md: 9 }} >

                 <Grid size={{ xs: 12, md: 3 }}>
                     <IndicatorUI
                         title='Temperatura (2m)'
                         description={temperature2mValue !== undefined ? `${temperature2mValue}${temperature2mUnit}` : 'Cargando...'}
                     />
                 </Grid>

                 <Grid size={{ xs: 12, md: 3 }}>
                     <IndicatorUI
                         title='Temperatura aparente'
                         description={apparentTemperatureValue !== undefined ? `${apparentTemperatureValue}${apparentTemperatureUnit}` : 'Cargando...'}
                     />
                 </Grid>

                 <Grid size={{ xs: 12, md: 3 }}>
                     <IndicatorUI
                         title='Velocidad del viento'
                         description={windSpeedValue !== undefined ? `${windSpeedValue}${windSpeedUnit}` : 'Cargando...'}
                     />
                 </Grid>

                 <Grid size={{ xs: 12, md: 3 }}>
                     <IndicatorUI
                         title='Humedad relativa'
                         description={humidityValue !== undefined ? `${humidityValue}${humidityUnit}` : 'Cargando...'}
                     />
                 </Grid>

             </Grid>

         {/* Gráfico */}
         <Grid size={{ xs: 12, md: 6 }}>
             <WeatherChartUI
                 title="Temperatura por hora"
                 labels={chartLabels}
                 values={temperatureValues}
                 unit={selectedCity.label}
             />
         </Grid>

         {/* Tabla */}
         <Grid size={{ xs: 12, md: 6 }}>
             <ForecastTableUI title="Pronóstico horario" rows={forecastRows} />
         </Grid>

         {/* Información adicional */}
         <Grid size={{ xs: 12 }}>
             <Card>
                 <CardContent>
                     <Typography variant="h6" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
                         Información adicional
                     </Typography>
                     <Typography variant="body2" color="text.secondary">
                         {selectedCity.label} se consulta en segundo plano mediante Open-Meteo y cada cambio de selección vuelve a disparar la petición asincrónica para refrescar la vista.
                     </Typography>
                 </CardContent>
             </Card>
         </Grid>

      </Grid>
  )
}

export default App
