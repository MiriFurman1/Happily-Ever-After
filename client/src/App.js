import { useState, useEffect } from 'react'
import { Api } from './api/Api';
import './App.css';

function App() {
  const [plants, setPlants] = useState(null)

  useEffect(() => {
    Api.get('/plants').then(({ data }) => {
      setPlants(data)
    }).catch(e => console.log(e))
  })
console.log(plants);
  return (
    <div className="App">
<h1>{plants}</h1>
    </div>
  );
}

export default App;
