import './App.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Channel from '../pages/Channel';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Route path="/" exact component={Login}></Route>
        <Route path="/register" exact component={Register}></Route>
        <Route path="/channel" exact component={Channel}></Route>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
