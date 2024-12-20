import { useState, useEffect } from 'react';
import TableWeather from './components/TableWeather';
import ControlWeather from './components/ControlWeather';
import IndicatorWeather from './components/IndicatorWeather';
import LineChartWeather from './components/LineChartWeather';
import Summary from './components/Summary';
import Footer from './components/Footer';
import InputText from './components/InputText';
import Grid from '@mui/material/Grid'; 
import './App.css';
import Item from './interface/Item';

interface Indicator {
  title?: string;
  subtitle?: string;
  value?: string;
}

function App() {
  // State for indicators
  const [indicators, setIndicators] = useState<Indicator[]>([]);

  // State for weather data items
  const [items, setItems] = useState<Item[]>([]);

  // State for the selected city
  const [ciudad, setCiudad] = useState('Guayaquil');

  // States for the chart
  const [selectedVariable, setSelectedVariable] = useState<number>(-1);
  const [filteredData, setFilteredData] = useState<number[]>([]);
  const [timeLabels, setTimeLabels] = useState<string[]>([]);

  // Fetch data when the city changes
  useEffect(() => {
    const fetchData = async () => {
      const API_KEY = '7ab603611b28d516e4d44f47984a4dc7';
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&mode=xml&appid=${API_KEY}`
        );
        const savedTextXML = await response.text();

        // Parse XML response
        const parser = new DOMParser();
        const xml = parser.parseFromString(savedTextXML, 'application/xml');

        // Populate indicators
        const dataToIndicators: Indicator[] = [];
        const name = xml.getElementsByTagName('name')[0]?.textContent || '';
        dataToIndicators.push({ title: 'Location', subtitle: 'City', value: name });

        const location = xml.getElementsByTagName('location')[1];
        if (location) {
          const latitude = location.getAttribute('latitude') || '';
          dataToIndicators.push({ title: 'Location', subtitle: 'Latitude', value: latitude });

          const longitude = location.getAttribute('longitude') || '';
          dataToIndicators.push({ title: 'Location', subtitle: 'Longitude', value: longitude });

          const altitude = location.getAttribute('altitude') || '';
          dataToIndicators.push({ title: 'Location', subtitle: 'Altitude', value: altitude });
        }

        setIndicators(dataToIndicators);

        // Populate items (weather data)
        const dataToItems: any[] = [];
        const timeNodes = xml.getElementsByTagName('time');

        Array.from(timeNodes).slice(0, 6).forEach((timeNode) => {
          const dateStart = timeNode.getAttribute('from')?.split('T')[1] || '';
          const dateEnd = timeNode.getAttribute('to')?.split('T')[1] || '';
          const precipitation = parseFloat(timeNode.querySelector('precipitation')?.getAttribute('probability') || '0');
          const humidity = parseFloat(timeNode.querySelector('humidity')?.getAttribute('value') || '0');
          const clouds = parseFloat(timeNode.querySelector('clouds')?.getAttribute('all') || '0');

          dataToItems.push({ dateStart, dateEnd, precipitation, humidity, clouds });
        });

        setItems(dataToItems);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, [ciudad]);

  // Update filtered data and labels when the selected variable changes
  useEffect(() => {
    if (selectedVariable >= 0) {
      const variableKey = ['precipitation', 'humidity', 'clouds'][selectedVariable] as keyof Item;
  
      const newData = items.map((item) => {
        const value = item[variableKey];
        return typeof value === 'number' ? value : 0; // Asegurarse de que sea un número
      });
  
      const newLabels = items.map((item) => (item.dateStart ? String(item.dateStart) : 'N/A'));
  
      setFilteredData(newData);
      setTimeLabels(newLabels);
    }
  }, [selectedVariable, items]);
  
  

  // Render indicators dynamically
  const renderIndicators = () =>
    indicators.map((indicator, idx) => (
      <Grid key={idx} xs={12} xl={3} item>
        <IndicatorWeather
          title={indicator.title}
          subtitle={indicator.subtitle}
          value={indicator.value}
        />
      </Grid>
    ));

  return (
    <>
      <Grid container spacing={4} sx={{ padding: '20px' }}>
        {/* Header Section */}
        <Grid container item xs={12} spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <h3 id="inicio-title">{ciudad}, Ecuador</h3>
            <InputText setValue={setCiudad} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Summary />
          </Grid>
        </Grid>

        {/* Indicators Section */}
        <Grid item xs={12}>
          <h2 className="section-title">Indicadores</h2>
          <p className="section-text">
            Los indicadores presentan detalles sobre la ciudad que busca en ese momento.
          </p>
          <Grid container spacing={2}>{renderIndicators()}</Grid>
        </Grid>

        {/* Weather Table Section */}
        <Grid item xs={12}>
          <h2 className="section-title">Historial Climático</h2>
          <TableWeather itemsIn={items} />
        </Grid>

        {/* Weather Chart Section */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h2 className="section-title">Gráfico Climático</h2>
            <p className="section-text">
              Esta gráfica proporciona una visión integral de las principales variables climáticas que afectan el tiempo en {ciudad}.
            </p>
            <Grid container spacing={2}>
              <Grid item xs={12} xl={2}>
                <ControlWeather onChange={setSelectedVariable} />
              </Grid>
              <Grid item xs={12} xl={10}>
                <LineChartWeather data={filteredData} labels={timeLabels} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Footer Section */}
      <Footer />
    </>
  );
}

export default App;

