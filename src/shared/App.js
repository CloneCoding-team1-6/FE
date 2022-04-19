import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';
import { Channel, Chat, ChatHome, Login, Register } from '../pages'
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/ConfigStore";


function App() {
  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Login}></Route>
        <Route path="/chat" exact component={ChatHome} />
        <Route path="/chat/:roomid" exact component={Chat} />
        <Route path="/register" exact component={Register}></Route>
        <Route path="/channel" exact component={Channel}></Route>
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
