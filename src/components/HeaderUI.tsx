import Typography from '@mui/material/Typography';

export default function HeaderUI() {
    return (
        <Typography
            variant="h2"
            component="h1"
            sx={{ fontWeight: 'bold', color: 'text.primary' }}>
            Dashboard del Clima
        </Typography>
    )
}
