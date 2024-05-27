import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import React from 'react'
import Landingpage from './Components/Landingpage.jsx'
import Home from "./Home.jsx"
import Form from  './Components/signup.jsx';
import Users from  './Crud.jsx';
import CreateUser from  './CreateUser.jsx';
import Log from './Components/login.jsx';
import UpdateUser from './UserUpdate.jsx';
import NewSneakerForm from "./Components/NewSneakerForm.jsx";
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="/signup" element={<CreateUser />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Users" element={<Users />} />
      <Route path="/create" element={<CreateUser />} />
      <Route path="/login" element={<Log />} />
      <Route path="/update/:id" element={<UpdateUser />} />
      <Route path="/sneakerform" element={<NewSneakerForm/>}></Route>

    </Routes>
  </Router>
  )
}

export default App;
