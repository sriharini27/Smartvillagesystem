import { useEffect, useState } from "react";
import axios from "axios";

function Admin(){

  const [complaints,setComplaints] = useState([]);

  useEffect(()=>{
    fetchComplaints();
  },[]);

  const fetchComplaints = async () => {

    const res = await axios.get("http://127.0.0.1:5000/complaints");
    setComplaints(res.data);

  };

  const markResolved = async (id) => {

    await axios.put(`http://127.0.0.1:5000/complaints/${id}`,{
      status:"Resolved"
    });

    fetchComplaints();

  };

  return(

    <div>

      <h2>Admin Panel</h2>

      {complaints.map((c)=>(
        <div key={c.id} style={{
          border:"1px solid gray",
          padding:"10px",
          marginBottom:"10px"
        }}>

          <h3>{c.issue_type}</h3>

          <p>{c.description}</p>

          <p><b>City:</b> {c.city}</p>

          <p><b>Village:</b> {c.village}</p>

          <p>Status: {c.status}</p>

          {c.status !== "Resolved" && (
            <button onClick={()=>markResolved(c.id)}>
              Mark Resolved
            </button>
          )}

        </div>
      ))}

    </div>

  );
}

export default Admin;