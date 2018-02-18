import React, { Component } from 'react';
import FlightSearch from './FlightSearch';
import logo from './logo.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Kiwi Flight Searcher</h1>
        </header>
        <div className="App-intro">
          <FlightSearch />
        </div>
      </div>
    );
  }
}

export default App;
