
import './style/App.css'
import HomePage from './components/Pages/HomePage.js';
import Navbar from './components/Navbar.js';
import Register from './components/users/Register.js'
import Login from './components/users/Login.js';
import CreateNewEvent from './components/Pages/CreateNewEvent'
import OurWeddingPage from './components/Pages/OurWeddingPage'; 
import MyAccount from './components/Pages/MyProfile';
import GalleryPage from './components/Pages/GalleryPage'
import MyEvent from './components/Pages/MyEvent'
import TodoPage from './components/Pages/TodoPage'
import { Route,Routes } from 'react-router-dom';
import {useState} from 'react'
import {createContext} from 'react'

export const UserContext = createContext();
function App() {

const [userData,setUserData]=useState([])

  return (
    <div className="App">
      <UserContext.Provider value={{ userData, setUserData}}>
      <Navbar userData={userData} setUserData={setUserData}/>
      <Routes>
      <Route exact path="/" element={<HomePage/>}/>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/createnewevent" element={<CreateNewEvent/>} />
      <Route path="/ourweddingpage" element={<OurWeddingPage/>} />
      <Route path="/myprofile" element={<MyAccount/>} />
      <Route path="/gallerypage/:eventid" element={<GalleryPage/>} />
      <Route path="/myevent" element={<MyEvent/>}/>
      <Route path="/todolist" element={<TodoPage/>}/>
      
      </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
