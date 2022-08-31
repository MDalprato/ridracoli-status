import React, { useEffect } from "react"
import JsonData from '../fake_data/example.json'


const LivelloInvaso = () => {
  useEffect(() => {

  }, []);

  return
  <>
    <div>Livello invaso: {JsonData.livello_invaso} m.s.l.m.</div>
    <div>Condizioni meteo: {JsonData.ridraccoli.condizioniAtmosferiche}</div>
  </>
    ;
};

export default LivelloInvaso;