import React, { Component } from 'react';
import Navbar from './containers/navbar/navbar';
import Routes from './routes';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Routes />
      </React.Fragment>
    );
  }
}

export default App;
