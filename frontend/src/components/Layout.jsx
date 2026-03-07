import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Layout({ setIsLoggedIn }) {

  return (

    <div style={{display:"flex"}}>

      <Sidebar setIsLoggedIn={setIsLoggedIn} />

      <div style={{flex:1,padding:"20px"}}>
        <Outlet />
      </div>

    </div>

  );

}

export default Layout;