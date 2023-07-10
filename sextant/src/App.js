import './App.css';
import React, {useState, useEffect} from 'react';

function App() {
  return (
    <div className="App">
      <div className="banner">
        <h1>Sextant</h1>
      </div>

      <ExhibitComponent title="IPV4 Address" content={
        <DataComp url="https://api.ipify.org?format=json"/>
      }/>

      <ExhibitComponent title="IPV6 Address" content={
        <DataComp url="https://api64.ipify.org?format=json"/>
      }/>
    </div>
  );
}

function ExhibitComponent(props) {
  return(
    <div className="Exhibit">
      <h2>{props.title}</h2>
      <div className="Exhibit_Content">
        {props.content}
      </div>
    </div>
  )
}


function DataComp(props){
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData(){
      try{
        const response = await fetch(props.url);
        const data = await response.json();
        setData(data);
      } catch (error){
        console.error(error);
      }
    }
    fetchData();
  }, [props.url]);

  return (
    <div>
      {data ? <p>{data.ip}</p> : <p>Loading...</p>}
    </div>
  )
}

export default App;
