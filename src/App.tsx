
import './App.css'
import { Grid } from '@mui/material';

function App() {

  return (
    <Grid container spacing={5} sx={{ justifyContent: "left", alignItems: "center" }}>

         {/* Encabezado */}
         <Grid sx={{ display: { xs: "none", md: "block"} }} size={{ xs: 12, md: 12 }}>Elemento: Encabezado</Grid>

         {/* Alertas */}
         <Grid sx={{ display: { xs: "none", md: "block"} }} size={{ xs: 12, md: 12 }}>Elemento: Alertas</Grid>

         {/* Selector */}
         <Grid sx={{ display: { xs: "none", md: "block"} }} size={{ xs: 12, md: 3 }}>Elemento: Selector</Grid>

         {/* Indicadores */}
         <Grid sx={{ display: { xs: "none", md: "block"} }} size={{ xs: 12, md: 9 }}>Elemento: Indicadores</Grid>

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
