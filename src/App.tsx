
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import TableWeather from './components/TableWeather';
import ControlWeather from './components/ControlWeather';
import IndicatorWeather from './components/IndicatorWeather';
import './App.css'
import Grid from '@mui/material/Grid2' 
import LineChartWeather from './components/LineChartWeather';
import Item from './interface/Item';

{/* Hooks */ }
import {useState, useEffect} from 'react';

interface Indicator{
  title?:string;
  subtitle?:string;
  value?:string;
}

function App() {
  // Estado para indicadores
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  // Estado para almacenar los datos de tipo Item
  const [items, setItems] = useState<Item[]>([]);

  {/* Hook: useEffect */}
  useEffect( ()=>{
    let request = async()=>{    
      {/* Request */}
      let API_KEY = "7ab603611b28d516e4d44f47984a4dc7"
      let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
      let savedTextXML = await response.text();
    
      {/* XML Parser */}
      const parser = new DOMParser();
      const xml = parser.parseFromString(savedTextXML, "application/xml");

      {/* Arreglo para agregar los resultados */}

      let dataToIndicators : Indicator[] = new Array<Indicator>();

      {/*Análisis, extracción y almacenamiento del contenido del XML en el arreglo de resultados*/}

      let name = xml.getElementsByTagName("name")[0].innerHTML || ""
      dataToIndicators.push({"title":"Location", "subtitle": "City", "value": name})

      let location = xml.getElementsByTagName("location")[1]

      let latitude = location.getAttribute("latitude") || ""
      dataToIndicators.push({ "title": "Location", "subtitle": "Latitude", "value": latitude })

      let longitude = location.getAttribute("longitude") || ""
      dataToIndicators.push({ "title": "Location", "subtitle": "Longitude", "value": longitude })

      let altitude = location.getAttribute("altitude") || ""
      dataToIndicators.push({ "title": "Location", "subtitle": "Altitude", "value": altitude })

      //console.log( dataToIndicators ) 
      {/* Modificación de la variable de estado mediante la función de actualización */}      
      setIndicators(dataToIndicators);      

      // Extracción para items (datos climáticos)
      const dataToItems: Item[] = [];
      const timeNodes = xml.getElementsByTagName('time');

      Array.from(timeNodes).slice(0,6).forEach((timeNode) => {
        const dateStart = (timeNode.getAttribute('from'))?.split('T')[1] || '';// Toma solo la hora
        const dateEnd = timeNode.getAttribute('to')?.split('T')[1] || '';

        const precipitationNode = timeNode.querySelector('precipitation');
        const precipitation = precipitationNode?.getAttribute('probability') || '';

        const humidityNode = timeNode.querySelector('humidity');
        const humidity = humidityNode?.getAttribute('value') || '';

        const cloudsNode = timeNode.querySelector('clouds');
        const clouds = cloudsNode?.getAttribute('all') || '';

        dataToItems.push({ dateStart, dateEnd, precipitation, humidity, clouds });
      });
      setItems(dataToItems);
    } 
    request();
    }, [] 
  )

  let renderIndicators = () => {
    return indicators.map(
      (indicator, idx) => (
        <Grid key={idx} size={{ xs: 12, xl: 3 }}>
          <IndicatorWeather 
            title={indicator["title"]} 
            subtitle={indicator["subtitle"]} 
            value={indicator["value"]} />
        </Grid>
      )
    )
  }

  return (
    <Grid container spacing={5}>

      {/* Indicadores */}
      {renderIndicators()}
      
      <Grid size={{ xs: 12, xl: 2 }}>
        <ControlWeather/>
      </Grid>
      
      {/* Tabla */}
      <Grid size={{ xs: 12, xl: 6 }}>
        {/* <TableWeather/> */}
        <TableWeather itemsIn={items} />
      </Grid>

      {/* Gráfico */}
      <Grid size={{ xs: 12, xl: 4 }}>
          <LineChartWeather/>
      </Grid> 
      
    </Grid>
  )
}

export default App
