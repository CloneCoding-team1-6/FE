import './App.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Channel, Chat, Login, Register } from '../pages'
import { AddChatModal } from '../components';


function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Route path="/" exact component={Login}></Route>
        <Route path="/chat" exact component={Chat} />
        <Route path="/chat/:roomid" exact component={Chat} />
        <Route path="/register" exact component={Register}></Route>
        <Route path="/channel" exact component={Channel}></Route>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
