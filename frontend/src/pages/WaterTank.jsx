import { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function WaterTank({village}){

// 👇 ADD HERE

const tankLevels = {
Illupaiyurani:80,
Kovilpatti:60,
Ettayapuram:50,
Kayathar:70,
Kadambur:40
};

const [level,setLevel] = useState(tankLevels[village] || 60);
const [status,setStatus] = useState("Normal");

// 👇 village change aana tank level update aagum

useEffect(()=>{
setLevel(tankLevels[village] || 60);
},[village]);

useEffect(()=>{

const interval = setInterval(()=>{

setLevel(prev => {

let newLevel = prev - 0.5;

if(newLevel <= 20){
newLevel = prev + 1;
}

if(newLevel > 100){
newLevel = 100;
}

if(newLevel < 0){
newLevel = 0;
}

if(newLevel < 30){
setStatus("Low Level");
}
else if(newLevel > 90){
setStatus("Tank Full");
}
else{
setStatus("Normal");
}

return newLevel;

});

},5000);

return ()=>clearInterval(interval);

},[]);

return(

<div style={{textAlign:"center"}}>

<h2>Village Water Tank Monitoring</h2>

<h3>{village}</h3>

<div style={{width:"200px",margin:"auto"}}>

<CircularProgressbar
value={level}
text={`${level}%`}
/>

</div>

<h3>Sensor Reading: {level}%</h3>

<p>Status: {status}</p>

{level < 30 && (
<p style={{color:"red",fontWeight:"bold"}}>
⚠ Low Water Level Alert
</p>
)}

</div>

)

}

export default WaterTank;