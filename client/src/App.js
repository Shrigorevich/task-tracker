import React from 'react';
import Wrapper from './components/Wrapper'
import {BrowserRouter, Route, Switch} from "react-router-dom"
import NotFound from './components/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Switch>
      <Route path="/">
        <Wrapper/>
      </Route>
      <Route>
        <NotFound/>
      </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
