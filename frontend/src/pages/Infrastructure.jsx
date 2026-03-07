import { useState } from "react";
import WaterTank from "./WaterTank";
import StreetLights from "./StreetLights";

function Infrastructure(){

const villages = [
"Illupaiyurani",
"Kovilpatti",
"Ettayapuram",
"Kayathar",
"Kadambur"
];

const [village,setVillage] = useState("Illupaiyurani");

return(

<div style={{

minHeight:"100vh",
textAlign:"center",
backgroundImage:"url('/village-bg.jpeg')",
backgroundSize:"cover",
backgroundPosition:"center",
backgroundRepeat:"no-repeat",
padding:"30px"

}}>

<h1 style={{color:"#2e7d32"}}>
🌱 Village Infrastructure Monitoring
</h1>

<label>Select Village: </label>

<select
value={village}
onChange={(e)=>setVillage(e.target.value)}
style={{
padding:"8px",
borderRadius:"6px",
marginLeft:"10px"
}}
>
{villages.map((v,i)=>(
<option key={i}>{v}</option>
))}
</select>

<div style={{
display:"flex",
justifyContent:"space-around",
marginTop:"40px",
flexWrap:"wrap"
}}>

<div style={{
width:"300px",
background:"rgba(255,255,255,0.9)",
padding:"20px",
borderRadius:"10px",
boxShadow:"0 4px 15px rgba(0,0,0,0.2)"
}}>
<WaterTank village={village}/>
</div>

<div style={{
width:"500px",
background:"rgba(255,255,255,0.9)",
padding:"20px",
borderRadius:"10px",
boxShadow:"0 4px 15px rgba(0,0,0,0.2)"
}}>
<StreetLights village={village}/>
</div>

</div>

</div>

)

}

export default Infrastructure;