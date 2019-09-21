import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    values: []
  };
  componentDidMount() {
    axios
      .get('https://localhost:5001/api/values')
      .then(response => {
        console.log(response);
        this.setState({
          values: response.data
        });
      })
      .catch(error => console.log(error));
  }
  render() {
    return (
      <div className='app'>
        <h1>Hellow</h1>
        <ul>
          {this.state.values.map((value: any) => (
            <li key={value.id}>{value.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
