import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

export interface ForecastRow {
  time: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
}

interface ForecastTableUIProps {
  title: string;
  rows: ForecastRow[];
}

export default function ForecastTableUI({ title, rows }: ForecastTableUIProps) {
  if (rows.length === 0) {
    return (
      <Paper sx={{ p: 2.5, height: '100%' }} elevation={0}>
        <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 700 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Cargando pronóstico horario...
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2.5, height: '100%' }} elevation={0}>
      <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 700 }}>
        {title}
      </Typography>
      <TableContainer>
        <Table size="small" aria-label={title}>
          <TableHead>
            <TableRow>
              <TableCell>Hora</TableCell>
              <TableCell align="right">Temp.</TableCell>
              <TableCell align="right">Humedad</TableCell>
              <TableCell align="right">Viento</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.time} hover>
                <TableCell component="th" scope="row">
                  {row.time}
                </TableCell>
                <TableCell align="right">{row.temperature.toFixed(1)}°</TableCell>
                <TableCell align="right">{row.humidity.toFixed(0)}%</TableCell>
                <TableCell align="right">{row.windSpeed.toFixed(1)} km/h</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}