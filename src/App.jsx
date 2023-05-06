import { useEffect } from 'react';
import './App.css'
import { useState } from 'react';

function App() {

  const [user, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleAddUser = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email }
    console.log(user);
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })

      .then(res => res.json())
      .then(data => {
        console.log(data);
        const newUsers = [<div className="users"></div>, data]
        setUsers(newUsers)
        form.reset();
      })
  }
  return (
    <>
      <h1>Users management system</h1>
      <h3>user length: {user.length}</h3>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" /> <br />
        <input type="email" name="email" id="" /> <br />
        <input type="submit" value="Add user" />
      </form>
      <div>
        {
          user.map(user => <p key={user.id}>{user.id} : {user.name} : {user.email} </p>)
        }
      </div>
    </>
  )
}

export default App
