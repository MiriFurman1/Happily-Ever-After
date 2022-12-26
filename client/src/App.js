
import './style/App.css'
import HomePage from './components/Pages/HomePage.js';
import Navbar from './components/Navbar.js';
import Register from './components/users/Register.js'
import Login from './components/users/Login.js';
import OurWeddingPage from './components/Pages/OurWeddingPage'; 
import { Route,Routes } from 'react-router-dom';

function App() {


  return (
    <div className="App">
      <Navbar/>
      <Routes>
      <Route exact path="/" element={<HomePage/>}/>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/ourweddingpage" element={<OurWeddingPage/>} />
      </Routes>
    </div>
  );
}

export default App;
