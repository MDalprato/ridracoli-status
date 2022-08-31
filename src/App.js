import React, { useEffect, useState } from "react";
import GaugeChart from 'react-gauge-chart'
import './App.css';

const App = () => {
  const [ridracoliObj, setRidracoliObj] = useState({});

  useEffect(() => {
    const url = "https://www.romagnacque.it/datidiretta/index2.php";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json.livello_invaso);
        setRidracoliObj(json);

      } catch (error) {
        console.log("Cannot get error data !", error);
      }
    };

    fetchData();
  }, []);

  var maxVolumeLevel = 33060000;
  var currentVolumeLevel = ridracoliObj.volumeInvaso;
  const percVolumeLevel = Math.round(currentVolumeLevel * 100 / maxVolumeLevel).toFixed(2);
  const percVolumeLevelForGauge = Math.round(currentVolumeLevel * 100 / maxVolumeLevel).toFixed(2) / 100;

  const tempAirForGauge = ridracoliObj.idrometeoRidraccoli.CtemperaturaAria / 100;

  return (
    <div className="App">
      <div className="volume-info">
        <div className="info">
          <p>Livello invaso: {ridracoliObj.livelloInvaso} m</p>
          <p>Livello volume = {currentVolumeLevel} s.l.m</p>
        </div>
        <div className="percentage-char">
          <p>Percentuale invaso</p>
          <GaugeChart id="gauge-chart1"
            nrOfLevels={10}
            percent={percVolumeLevelForGauge}
          />
        </div>
      </div>


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
          />
        </div>
      </div>

    </div>
  );
};


export default App;
