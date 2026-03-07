import { useEffect, useState } from "react";
import { getComplaints } from "../services/api";

import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function Dashboard(){

  const [complaints,setComplaints] = useState([]);
  const [village,setVillage] = useState("All");

  const villages = [
    "All",
    "Illupaiyurani",
    "Kovilpatti",
    "Ettayapuram",
    "Kayathar",
    "Kadambur"
  ];

  useEffect(()=>{

fetchData();

const interval = setInterval(()=>{
fetchData();
},3000);

return ()=>clearInterval(interval);

},[]);

  const fetchData = async()=>{
    const res = await getComplaints();
    setComplaints(res.data);
  }

  // Filter complaints by village
  const filteredComplaints =
    village === "All"
      ? complaints
      : complaints.filter(c => c.village === village);

  const pending =
    filteredComplaints.filter(c=>c.status==="Pending").length;

  const resolved =
    filteredComplaints.filter(c=>c.status==="Resolved").length;

  const chartValues = [pending, resolved];

const data = {
labels:["Pending","Resolved"],
datasets:[
{
data:[pending,resolved],
backgroundColor:["orange","green"],
borderWidth:1
}
]
};
// -------- Complaint Trend (Last 7 Days) --------

const trendCounts = {};

complaints.forEach((c)=>{

const date = new Date(c.created_at || Date.now());

const day = date.toLocaleDateString("en-US",{weekday:"short"});

if(trendCounts[day]){
trendCounts[day]++;
}else{
trendCounts[day] = 1;
}

});

const trendData = {
labels:Object.keys(trendCounts),
datasets:[
{
label:"Complaints Trend",
data:Object.values(trendCounts),
backgroundColor:"#2e7d32"
}
]
};


  // -------- Village Comparison Logic --------

  const villageCounts = {};

  complaints.forEach((c)=>{
    if(villageCounts[c.village]){
      villageCounts[c.village]++;
    } else {
      villageCounts[c.village] = 1;
    }
  });

  const villageChartData = {
    labels: Object.keys(villageCounts),
    datasets:[
      {
        label:"Complaints per Village",
        data:Object.values(villageCounts),
        backgroundColor:[
          "#3498db",
          "#e74c3c",
          "#2ecc71",
          "#f1c40f",
          "#9b59b6"
        ]
      }
    ]
  };

  return(

<div>

<h1 style={{
fontSize:"28px",
fontWeight:"bold",
color:"#2e7d32"
}}>
🌱 Smart Village Infrastructure Monitoring System
</h1>

<h2>Smart Village Dashboard</h2>

<label>Select Village: </label>

<select
value={village}
onChange={(e)=>setVillage(e.target.value)}
>
{villages.map((v,i)=>(
<option key={i}>{v}</option>
))}
</select>
      <br/><br/>

      {/* Stats Cards */}

      <div style={{display:"flex",gap:"20px"}}>

        <div style={{
          background:"#f0f0f0",
          padding:"20px",
          borderRadius:"10px"
        }}>
          <h3>Total Complaints</h3>
          <p>{filteredComplaints.length}</p>
        </div>

        <div style={{
          background:"#fff3cd",
          padding:"20px",
          borderRadius:"10px"
        }}>
          <h3>Pending</h3>
          <p>{pending}</p>
        </div>

        <div style={{
          background:"#d4edda",
          padding:"20px",
          borderRadius:"10px"
        }}>
          <h3>Resolved</h3>
          <p>{resolved}</p>
        </div>

      </div>

      <br/>

      {/* Pie Chart */}

      <div style={{width:"300px", height:"300px"}}>
  <Pie data={data}/>
</div>

      <br/><br/>

      <div style={{
display:"flex",
gap:"40px",
flexWrap:"wrap",
marginTop:"40px"
}}>

<div style={{width:"400px"}}>

<h3>Village Comparison</h3>

<Bar data={villageChartData}/>

</div>


<div style={{width:"400px"}}>

<h3>Complaint Trend (Last 7 Days)</h3>

<Bar data={trendData}/>

</div>

</div>
    </div>

  );
}

export default Dashboard;