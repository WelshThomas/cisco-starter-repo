import './App.css';
import React, {useState, useEffect} from 'react';

function App() {
  return (
    <div className="App">
      <div className="banner">
        <h1>Sextant</h1>
      </div>

      <div className="Component_Grid">
        <ExhibitComponent title="IPV4 Address" content={
          <DataComp url="https://api.ipify.org?format=json"/>
        }/>

        <ExhibitComponent title="IPV6 Address" content={
          <DataComp url="https://api64.ipify.org?format=json"/>
        }/>

        <ExhibitComponent title="Latency Websocket" content={
          <WebSocketComp />
        }/>
      </div>
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

function WebSocketComp(){
  var lastEpoch = null;
  var [data, setData] = useState(null);
  React.useEffect(() => {
    const websocket = new WebSocket("ws://localhost:55455")

    websocket.onopen =() =>{
      console.log("Connected");
    }

    websocket.onmessage = (event) => {
      var dataFound = JSON.parse(event.data);
      var data = 0;
      console.log(dataFound);
      if(lastEpoch != null){
        data = dataFound - lastEpoch;
      }

      lastEpoch = dataFound;

      data = data/10;

      setData(data);
    }

    return () => {
      websocket.close();
    }
  }, [])

    return (      
      <p>{data}ms</p>
    )
}

export default App;
