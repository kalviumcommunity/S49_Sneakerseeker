import React from "react";
import axios from 'axios'; 
import { useEffect, useState } from 'react';
import Cookies from "js-cookie"; 
import { useNavigate } from "react-router-dom";
import './Home.css'
import cookies from 'js-cookie';
function Home(){
    const [users,setUsers] = useState([])
    const [usernames,setUsernames] = useState([])
    const username = cookies.get('username')
    const [selecteduser,setselecteduser]=useState(username)
    const navigate = useNavigate()
    useEffect(() => {
     axios.get('http://localhost:3000')
     .then(users => setUsers(users.data))
     .catch(err => console.log(err))
    },[])

    useEffect(() => {
      axios.get('http://localhost:3000/users')
      .then(users => setUsernames(users.data))
      .catch(err => console.log(err))
     },[])

    const handlelogout = ()=>{
      Cookies.remove('username')
      Cookies.remove('token')
      navigate('/login');
    }
    console.log(selecteduser)
    return(
        <div className="api">
          <div>
            <button onClick={handlelogout}>logout</button>
            <button onClick={()=>{navigate('/sneakerform')}}>Add sneakers</button>
            <select onChange={(e)=>{setselecteduser(e.target.value)}} value={selecteduser} id="">
              {usernames.map(users=>(
                <option key={users._id} value={users.email}>{users.name}</option>
              ))}
            </select>
          </div>
        {users &&
            users.filter(users=>users.created_by==selecteduser).map((guides, id) => (
              <div className="data" key={id}>
                <p><strong>Sneaker Name: </strong>{guides. sneakerName}</p>
                <p><strong>Price: </strong>{guides.price}</p>
                <p><strong> Color: </strong>{guides. color}</p>
                <p><strong>Rating: </strong>{guides.rating}</p>
                <p><strong> Review: </strong>{guides. review}</p>
              </div>
            ))}
        </div>      
    )
}
export default Home;