import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
   
interface Indicator {
    title?: String;
    subtitle?: String;
    value?: String;
}

export default function IndicatorWeather(config: Indicator) {       
    let objCSS = {
    p: 2,
    display: 'flex',
    flexDirection: 'column'
    }
    return (
        <Paper sx={objCSS}>
            <Typography component="h2" variant="h6" 
                        color="primary" gutterBottom>
                {config.title} 
            </Typography>
            <Typography component="p" variant="h4">
                {config.value}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                {config.subtitle}
            </Typography>
        </Paper> 
    )
}