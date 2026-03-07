import { useState, useEffect } from "react";

function StreetLights({village}){

// 👇 ADD HERE

const villageLights = {
Illupaiyurani:18,
Kovilpatti:15,
Ettayapuram:17,
Kayathar:14,
Kadambur:16
};

// initial lights
const [lights,setLights] = useState(Array(20).fill(true));


// 👇 village change aana lights update aagum

useEffect(()=>{

const working = villageLights[village] || 15;

const newLights = Array(20).fill(false).map((_,i)=> i < working);

setLights(newLights);

},[village]);


// sensor simulation

useEffect(()=>{

const interval = setInterval(()=>{

setLights(prevLights =>

prevLights.map(light => {

const faultChance = Math.random();

if(faultChance < 0.1){
return false;
}

return true;

})

);

},10000);

return ()=>clearInterval(interval);

},[]);


const working = lights.filter(l => l).length;
const faulty = lights.filter(l => !l).length;

return(

<div style={{textAlign:"center"}}>

<h2>Street Light Monitoring</h2>

<h3>{village}</h3>

<p>Total Lights: 20</p>
<p style={{color:"green"}}>Working: {working}</p>
<p style={{color:"red"}}>Faulty: {faulty}</p>

<div className="grid">

{lights.map((light,i)=>(

<div
key={i}
className={light ? "on":"off"}
>

</div>

))}

</div>

</div>

)

}

export default StreetLights;