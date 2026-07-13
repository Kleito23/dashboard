import HeaderUI from './components/HeaderUI';
import './App.css'
import { Grid } from '@mui/material';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './hooks/useFetchData';
import { useState } from 'react';


function App() {
    const [cityInput, setCityInput] = useState('guayaquil');
    const dataFetcherOutput = useFetchData(cityInput);

    const temperature2mValue = dataFetcherOutput.hourly.temperature_2m[0];
    const temperature2mUnit = dataFetcherOutput.hourly_units.temperature_2m;
    const apparentTemperatureValue = dataFetcherOutput.hourly.apparent_temperature[0];
    const apparentTemperatureUnit = dataFetcherOutput.hourly_units.apparent_temperature;
    const windSpeedValue = dataFetcherOutput.hourly.wind_speed_10m[0];
    const windSpeedUnit = dataFetcherOutput.hourly_units.wind_speed_10m;
    const humidityValue = dataFetcherOutput.hourly.relative_humidity_2m[0];
    const humidityUnit = dataFetcherOutput.hourly_units.relative_humidity_2m;

  return (
    <Grid container spacing={5} sx={{ justifyContent: "left", alignItems: "center" }}>

         {/* Encabezado */}
         <Grid sx={{ display: { xs: "none", md: "block"} }} size={{ xs: 12, md: 12 }}><HeaderUI/></Grid>

         {/* Alertas */}
         <Grid container sx={{ justifyContent: "right", alignItems: "center" }} size={{ xs: 12, md: 12 } }><AlertUI description="No se preveen lluvias"/>
</Grid>

         {/* Selector */}
         <Grid sx={{ display: { xs: "none", md: "block"} }} size={{ xs: 12, md: 3 }}><SelectorUI cityInput={cityInput} onCityChange={setCityInput}/></Grid>

        {/* Indicadores */}
        <Grid container size={{ xs: 12, md: 9 }} >

                 <Grid size={{ xs: 12, md: 3 }}>
                                         {temperature2mValue !== undefined ? (
                                             <IndicatorUI
                                                 title='Temperatura (2m)'
                                                 description={`${temperature2mValue}${temperature2mUnit}`}
                                             />
                                         ) : (
                                             <IndicatorUI
                                                 title='Temperatura (2m)'
                                                 description='Cargando...'
                                             />
                                         )}
                 </Grid>

                 <Grid size={{ xs: 12, md: 3 }}>
                     {apparentTemperatureValue !== undefined ? (
                         <IndicatorUI
                             title='Temperatura aparente'
                             description={`${apparentTemperatureValue}${apparentTemperatureUnit}`}
                         />
                     ) : (
                         <IndicatorUI
                             title='Temperatura aparente'
                             description='Cargando...'
                         />
                     )}
                 </Grid>

                 <Grid size={{ xs: 12, md: 3 }}>
                     {windSpeedValue !== undefined ? (
                         <IndicatorUI
                             title='Velocidad del viento'
                             description={`${windSpeedValue}${windSpeedUnit}`}
                         />
                     ) : (
                         <IndicatorUI
                             title='Velocidad del viento'
                             description='Cargando...'
                         />
                     )}
                 </Grid>

                 <Grid size={{ xs: 12, md: 3 }}>
                     {humidityValue !== undefined ? (
                         <IndicatorUI
                             title='Humedad relativa'
                             description={`${humidityValue}${humidityUnit}`}
                         />
                     ) : (
                         <IndicatorUI
                             title='Humedad relativa'
                             description='Cargando...'
                         />
                     )}
                 </Grid>

             </Grid>

         {/* Gráfico */}
         <Grid sx={{ display: { xs: "none", md: "block"} }} size={{ xs: 12, md: 6 }}>Elemento: Gráfico</Grid>

         {/* Tabla */}
         <Grid sx={{ display: { xs: "none", md: "block"} }} size={{ xs: 12, md: 6 }}>Elemento: Tabla</Grid>

         {/* Información adicional */}
         <Grid sx={{ display: { xs: "none", md: "block"} }} size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>

      </Grid>
  )
}

export default App
