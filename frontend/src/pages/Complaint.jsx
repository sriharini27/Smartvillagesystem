import { useState } from "react";
import { addComplaint } from "../services/api";

function ComplaintForm(){

const [form,setForm] = useState({
name:"",
issue_type:"",
city:"",
village:"",
description:"",
latitude:"",
longitude:""
});

const [message,setMessage] = useState("");

const getLocation = ()=>{

if(navigator.geolocation){

navigator.geolocation.getCurrentPosition(async(position)=>{

const lat = position.coords.latitude;
const lon = position.coords.longitude;

try{

const res = await fetch(
`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
);

const data = await res.json();

const city =
data.address.city ||
data.address.town ||
data.address.municipality ||
data.address.county ||
data.address.state_district ||
"";

const village =
data.address.village ||
data.address.suburb ||
data.address.neighbourhood ||
data.address.hamlet ||
data.address.quarter ||
data.address.locality ||
data.address.city_district ||
city;

setForm({
...form,
latitude:lat,
longitude:lon,
city:city,
village:village
});

setMessage("Location detected automatically 📍");

}catch(error){

console.log(error);
setMessage("Location detection failed ❌");

}

});

}else{

setMessage("Geolocation not supported");

}

};

const handleSubmit = async(e)=>{

e.preventDefault();

if(
!form.name ||
!form.issue_type ||
!form.city ||
!form.village ||
!form.description
){
setMessage("Please fill all fields ❌");
return;
}

try{

await addComplaint(form);

setMessage("Complaint submitted successfully ✅");

setForm({
name:"",
issue_type:"",
city:"",
village:"",
description:"",
latitude:"",
longitude:""
});

}catch(error){

console.log(error);
setMessage("Error submitting complaint ❌");

}

};

return(

<div>

<h2>Register Complaint</h2>

{message && <p>{message}</p>}

<form onSubmit={handleSubmit}>

<input
placeholder="Your Name"
value={form.name}
onChange={(e)=>setForm({...form,name:e.target.value})}
/>

<select
value={form.issue_type}
onChange={(e)=>setForm({...form,issue_type:e.target.value})}
>
<option value="">Select Issue Type</option>
<option>Street Light</option>
<option>Water Problem</option>
<option>Road Damage</option>
<option>Pothole Damage</option>
</select>

<input
placeholder="City / Town (Example: Kovilpatti)"
value={form.city}
onChange={(e)=>setForm({...form,city:e.target.value})}
/>

<input
placeholder="Village (Example: Illupaiyurani)"
value={form.village}
onChange={(e)=>setForm({...form,village:e.target.value})}
/>

<textarea
placeholder="Describe the issue"
value={form.description}
onChange={(e)=>setForm({...form,description:e.target.value})}
/>

<button type="button" onClick={getLocation}>
Get GPS Location
</button>

{form.latitude && (
<p>
📍 {form.latitude}, {form.longitude}
</p>
)}

<button type="submit">
Submit Complaint
</button>

</form>

</div>

);

}

export default ComplaintForm;