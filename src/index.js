import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './custom.scss';
import App from './App';
import Home from './components/home/home';
import Manage from './components/manage/manage';
import Analyze from './components/analyze/analyze';
import * as serviceWorker from './serviceWorker';
import 'bootstrap';

const routing = (
    <Router>
      <div>
        <Route exact path="/" component={() => <App page={<Home/>} menu={0}/>}/>
        <Route path="/manage" component={() => <App page={<Manage/>} menu={1}/>} />
        <Route path="/analyze" component={() => <App page={<Analyze/>} menu={2}/>} />
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
