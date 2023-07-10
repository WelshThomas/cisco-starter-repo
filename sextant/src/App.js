import './App.css';

function App() {
  return (
    <div className="App">
      <div className="banner">
        <h1>Sextant</h1>
      </div>

      <ExhibitComponent title="Title Here" content={
        <p>Content is here<p>Second content element is here</p></p>
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

export default App;
