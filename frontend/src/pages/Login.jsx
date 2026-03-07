import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login({ setIsLoggedIn }) {

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const navigate = useNavigate();

const handleLogin = ()=>{

if(email.trim()==="" || password.trim()===""){
alert("Please enter email and password");
return;
}

setIsLoggedIn(true);

navigate("/");

};

return(

<div style={{
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
backgroundImage:"url('/login-bg.png')",
backgroundSize:"cover",
backgroundPosition:"center",
backgroundRepeat:"no-repeat"
}}>

<div style={{

width:"350px",
background:"rgba(255,255,255,0.92)",
padding:"30px",
borderRadius:"12px",
boxShadow:"0 10px 30px rgba(0,0,0,0.3)",
textAlign:"center"

}}>

<h2 style={{
color:"#2e7d32",
marginBottom:"5px"
}}>
🌱 Smart Village Login
</h2>

<p style={{
color:"gray",
marginBottom:"20px"
}}>
Infrastructure Monitoring System
</p>

<div style={{position:"relative",marginTop:"10px"}}>

<span style={{
position:"absolute",
left:"10px",
top:"50%",
transform:"translateY(-50%)"
}}>
📧
</span>

<input
type="text"
placeholder="Enter Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={{
width:"100%",
padding:"10px 10px 10px 35px",
borderRadius:"6px",
border:"1px solid #ccc"
}}
/>

</div>


<div style={{position:"relative",marginTop:"10px"}}>

<span style={{
position:"absolute",
left:"10px",
top:"50%",
transform:"translateY(-50%)"
}}>
🔒
</span>

<input
type="password"
placeholder="Enter Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={{
width:"100%",
padding:"10px 10px 10px 35px",
borderRadius:"6px",
border:"1px solid #ccc"
}}
/>

</div>

<button
onClick={handleLogin}
style={{
width:"100%",
padding:"10px",
marginTop:"15px",
background:"#2e7d32",
color:"white",
border:"none",
borderRadius:"6px",
cursor:"pointer",
fontWeight:"bold"
}}
>
Login
</button>

</div>

</div>

);

}

export default Login;