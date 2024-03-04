import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import React from 'react'
import Data from './Components/Data.jsx'
import Landingpage from './Components/Landingpage.jsx'
import Home from "./Home.jsx"
import Form from  './Components/signup.jsx';
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="/signup" element={<Form />} />
      <Route path="/signup" element={<Form />} />
      <Route path="/Home" element={<Home />} />
    </Routes>
  </Router>
  )
}

export default App;
