import React from 'react';
import logo from './logo.svg';
import './App.css';

import Navbar from './components/general/navbar'

class App extends React.Component {


  render(){
  return (
    <div>
      <header>
        <Navbar current={this.props.menu}/>
      </header>
      {this.props.page}
    </div>
  );
  }
}

export default App;
