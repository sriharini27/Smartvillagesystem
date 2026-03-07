import { useState, useEffect } from "react";
import { getComplaints } from "../services/api";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Home(){

const villages = [
"Illupaiyurani",
"Kovilpatti",
"Ettayapuram",
"Kayathar",
"Kadambur"
];

const villageCoordinates = {
Illupaiyurani:[9.1900,77.8700],
Kovilpatti:[9.1710,77.8680],
Ettayapuram:[9.1440,77.9900],
Kayathar:[8.9480,77.7740],
Kadambur:[9.0500,77.8500]
};

const [village,setVillage] = useState("Illupaiyurani");
const [complaints,setComplaints] = useState([]);

useEffect(()=>{
  fetchData();
},[]);

const fetchData = async()=>{
  const res = await getComplaints();
  setComplaints(res.data);
}

const villagePopulation = {
Illupaiyurani:12500,
Kovilpatti:9800,
Ettayapuram:8700,
Kayathar:7600,
Kadambur:6500
};

const villageComplaints =
complaints.filter(c=>c.village === village).length;

// recent complaints
const recentComplaints =
complaints
.filter(c=>c.village === village)
.slice(-3)
.reverse();

return(

<div>

<h1>Smart Village Dashboard</h1>

<label>Select Village</label>

<select
value={village}
onChange={(e)=>setVillage(e.target.value)}
>

{villages.map((v,i)=>(
<option key={i}>{v}</option>
))}

</select>

{/* Cards */}

<div className="cards">

<div className="card">
<h3>Village</h3>
<p>{village}</p>
</div>

<div className="card">
<h3>Population</h3>
<p>{villagePopulation[village]}</p>
</div>

<div className="card">
<h3>Total Complaints</h3>
<p>{villageComplaints}</p>
</div>

</div>

{/* Map */}

<h3>Village Location</h3>

<MapContainer
center={villageCoordinates[village]}
zoom={12}
style={{height:"300px",width:"100%"}}
>

<TileLayer
url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>

<Marker position={villageCoordinates[village]}>

<Popup>
{village}
</Popup>

</Marker>

</MapContainer>

{/* Recent Activity */}

<h3>Recent Complaints</h3>

<div>

{recentComplaints.length === 0 && (
<p>No complaints yet</p>
)}

{recentComplaints.map((c,i)=>(

<div key={i} className="card">

<p><b>{c.issue_type}</b></p>

<p>{c.description}</p>

<p>Status: {c.status}</p>

</div>

))}

</div>

<div className="announcement">
📢 Water tank cleaning tomorrow
</div>

</div>

)

}

export default Home;