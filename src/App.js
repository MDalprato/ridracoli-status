import React, { useEffect, useState } from "react";
import GaugeChart from 'react-gauge-chart'
import {Button, Stack} from 'react-bootstrap';
import './main.scss';

const App = () => {
  const [ridracoliObj, setRidracoliObj] = useState({});
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const url = "https://www.romagnacque.it/datidiretta/index2.php";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json.livello_invaso);
        setRidracoliObj(json);
        setIsLoading(false);

      } catch (error) {
        console.log("Cannot get error data !", error);
      }
    };

    fetchData();
  }, []);


  if (isLoading) {
    return (<p>Loading ...</p>)
  }

  var maxVolumeLevel = 33060000;
  var currentVolumeLevel = ridracoliObj.volumeInvaso;
  const percVolumeLevel = Math.round(currentVolumeLevel * 100 / maxVolumeLevel).toFixed(2);
  const percVolumeLevelForGauge = Math.round(currentVolumeLevel * 100 / maxVolumeLevel).toFixed(2) / 100;

  const tempAirForGauge = ridracoliObj.idrometeoRidraccoli.CtemperaturaAria / 100;



  return (
    <div className="App">
      <div className="title">
        <h1>Diga di Ridracoli</h1>
      </div>
      <div className="volume-info">
        <div className="info">
          <p>Livello invaso: {ridracoliObj.livelloInvaso}  m.s.l.m.</p>
          <p>Volume Invaso = {currentVolumeLevel} m³</p>
          <p>Variazione odierna = {ridracoliObj.ridraccoli.variazioneQuotaInvaso} cm</p>
        </div>
        <div className="percentage-char">
          <p>Percentuale invaso</p>
          <GaugeChart id="gauge-chart1"
            nrOfLevels={10}
            percent={percVolumeLevelForGauge}
          />
        </div>
      </div>

      <Stack direction="horizontal" gap={2}>
  <Button as="a" variant="primary">
    Button as link
  </Button>
  <Button as="a" variant="success">
    Button as link
  </Button>
</Stack>

      <div className="temperature-info">
        <div className="info">
          <p>Temperatura aria: {ridracoliObj.idrometeoRidraccoli.CtemperaturaAria}</p>
          <p>Umidità = {ridracoliObj.idrometeoRidraccoli.Dumidita}</p>
          <p>Pressione atmosferica: {ridracoliObj.idrometeoRidraccoli.DpressioneAtmosferica} mb</p>
        </div>
        <div className="percentage-char">
          <p>Percentuale invaso</p>
          <GaugeChart id="gauge-chart2"
            nrOfLevels={10}
            percent={tempAirForGauge}
            formatTextValue={value => value + '°C'}
          />
        </div>
      </div>


      <div className="temperature-info">
        <div className="info">
          <p>Temperatura aria: {ridracoliObj.idrometeoRidraccoli.CtemperaturaAria}</p>
          <p>Umidità = {ridracoliObj.idrometeoRidraccoli.Dumidita}</p>
          <p>Pressione atmosferica: {ridracoliObj.idrometeoRidraccoli.DpressioneAtmosferica} mb</p>
        </div>
      </div>

    </div>
  );
};


export default App;
