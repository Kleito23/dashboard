import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface WeatherChartUIProps {
  title: string;
  labels: string[];
  values: number[];
  unit: string;
}

export default function WeatherChartUI({ title, labels, values, unit }: WeatherChartUIProps) {
  if (values.length === 0) {
    return (
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Typography variant="h6" component="h2" sx={{ mb: 1.5, fontWeight: 700 }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Cargando datos para {unit}...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const paddingX = 28;
  const paddingY = 24;
  const width = 640;
  const height = 240;

  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = maxValue - minValue || 1;

  const points = values.map((value, index) => {
    const x = paddingX + (index * (width - paddingX * 2)) / Math.max(values.length - 1, 1);
    const normalized = (value - minValue) / range;
    const y = height - paddingY - normalized * (height - paddingY * 2);
    return `${x},${y}`;
  });

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" component="h2" sx={{ mb: 1.5, fontWeight: 700 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Tendencia de las próximas horas en {unit}
        </Typography>
        <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="auto" role="img" aria-label={title}>
          <defs>
            <linearGradient id="temperatureGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0f766e" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="rgba(148, 163, 184, 0.35)" />
          <polyline
            fill="none"
            stroke="#0f766e"
            strokeWidth="4"
            strokeLinejoin="round"
            strokeLinecap="round"
            points={points.join(' ')}
          />
          <polygon fill="url(#temperatureGradient)" points={`${paddingX},${height - paddingY} ${points.join(' ')} ${width - paddingX},${height - paddingY}`} opacity="0.55" />
          {values.map((value, index) => {
            const x = paddingX + (index * (width - paddingX * 2)) / Math.max(values.length - 1, 1);
            const normalized = (value - minValue) / range;
            const y = height - paddingY - normalized * (height - paddingY * 2);

            return (
              <g key={`${labels[index]}-${value}`}>
                <circle cx={x} cy={y} r="5" fill="#0f766e" />
                <text x={x} y={y - 12} textAnchor="middle" fontSize="12" fill="#0f172a" fontWeight="700">
                  {value.toFixed(1)}°
                </text>
                <text x={x} y={height - 4} textAnchor="middle" fontSize="11" fill="#475569">
                  {labels[index]}
                </text>
              </g>
            );
          })}
        </svg>
      </CardContent>
    </Card>
  );
}