// import { useState, useEffect } from 'react'
// import { Api } from './api/Api';
import './style/App.css'
import HomePage from './components/Pages/HomePage.js';
import Navbar from './components/Navbar.js';
import Register from './components/users/Register.js'
import Login from './components/users/Login.js';
import { Route,Routes } from 'react-router-dom';

function App() {
  // const [plants, setPlants] = useState(null)

  // useEffect(() => {
  //   Api.get('/plants').then(({ data }) => {
  //     setPlants(data)
  //   }).catch(e => console.log(e))
  // })
  // console.log(plants);



  return (
    <div className="App">
      <Navbar/>
      <Routes>
      <Route exact path="/" element={<HomePage/>}/>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      </Routes>
    </div>
  );
}

export default App;
