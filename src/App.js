import React, { useEffect, useState } from "react";
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

  return (
    <div className="App">
      <header className="App-header">
      <h1>Diga di ridracoli</h1>
      <p>Livello invaso: {ridracoliObj.livelloInvaso}</p>
      {/* <p>deflussiVolumeTotale: {ridracoliObj.ridraccoli.deflussiVolumeTotale}</p>
      <p>condizioniAtmosferiche: {ridracoliObj.ridraccoli.condizioniAtmosferiche}</p>
       */}
       <p>currentVolumeLevel = {currentVolumeLevel}</p>
       <p>Percentuale invaso: {percVolumeLevel} % </p>
      </header>
    </div>
  );
};


export default App;
