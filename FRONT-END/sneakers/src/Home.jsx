import React from "react";
import axios from 'axios'; 
import { useEffect, useState } from 'react';

function Home(){
    const [users,setUsers] = useState([])
    useEffect(() => {
     axios.get('http://localhost:3000/')
     .then(users => setUsers(users.data))
     .catch(err => console.log(err))
    },[])
    return(
        <div className="api">
        {users &&
            users.map((guides, id) => (
              <div className="data" key={id}>
                <p><strong>     Sneaker Name: </strong>{guides. sneakerName}</p>
                <p><strong>Price: </strong>{guides.price}</p>
                <p><strong>State: </strong>{guides.state}</p>
                <p><strong> Color: </strong>{guides. color}</p>
                <p><strong>Rating: </strong>{guides.rating}</p>
                <p><strong> Review: </strong>{guides. review}</p>
              </div>
            ))}
          
        </div>
        
    )
}
export default Home;