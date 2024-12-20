import Paper from '@mui/material/Paper';
import { LineChart } from '@mui/x-charts/LineChart';

interface LineChartWeatherProps {
  data: number[];
  labels: string[];
}

export default function LineChartWeather({ data, labels }: LineChartWeatherProps) {
  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <LineChart
        width={800}
        height={400}
        series={[{ data, label: 'Variable Seleccionada' }]}
        xAxis={[{ scaleType: 'point', data: labels }]}
      />
    </Paper>
  );
}


// import Paper from '@mui/material/Paper';
// import { LineChart } from '@mui/x-charts/LineChart';

// const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
// const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
// const xLabels = [
//     'Page A',
//     'Page B',
//     'Page C',
//     'Page D',
//     'Page E',
//     'Page F',
//     'Page G',
// ];

// export default function LineChartWeather() {
//     return (
//         <Paper
//             sx={{
//                 p: 2,
//                 display: 'flex',
//                 flexDirection: 'column'
//             }}
//         >

//             {/* Componente para un gráfico de líneas */}
//             <LineChart
//                 width={400}
//                 height={250}
//                 series={[
//                     { data: pData, label: 'pv' },
//                     { data: uData, label: 'uv' },
//                 ]}
//                 xAxis={[{ scaleType: 'point', data: xLabels }]}
//             />
//         </Paper>
//     );
// }