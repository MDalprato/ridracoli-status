import React, { useEffect, useState } from "react";
import './App.css';


const App = () => {
  const [livelloInvaso, setLivelloInvaso] = useState("");
  const [ridracoliObj, setRidracoliObj] = useState({});

  useEffect(() => {
    const url = "https://www.romagnacque.it/datidiretta/index2.php";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json.livello_invaso);
        setLivelloInvaso(json.livello_invaso);
        setRidracoliObj(json.ridraccoli);

      } catch (error) {
        console.log("Cannot get error data !", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      <h1>Fetch Data from an API</h1>
      <p>Livello invaso: {livelloInvaso}</p>
      <p>deflussiVolumeTotale: {ridracoliObj.deflussiVolumeTotale}</p>
      <p>condizioniAtmosferiche: {ridracoliObj.condizioniAtmosferiche}</p>

      
      </header>
    </div>
  );
};


export default App;
