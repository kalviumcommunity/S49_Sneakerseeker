import React from 'react';
import '../Components/Landingpage.css'; 
import { Link } from 'react-router-dom'; 
import SignUp from './signup'; 

function Landingpage() {
  return (
    <div>
      <div className="header">
        <div className="title">
          <h1>SneakerSeeker</h1>
        </div>
      </div>
      <div className="logo">
        <Link to="/SignUp" className="button">Sign up</Link>
        <Link to="/Users" className="button">Data</Link>

        {/* <Link to="/UserList">data</Link>  */}
      </div>
    </div>
  );
}

export default Landingpage;