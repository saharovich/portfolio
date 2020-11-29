import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Loader from "./components/loader";
import SideNav from './components/sideNav';
import Home from './components/home';
import About from "./components/about";

const App = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      { loading
        ? <Loader />
        : <Switch>
          <Route exact path="/">
            <SideNav />
            <Home />
            <About />
          </Route>
          {/* <Route path='/404' component={PageNotFound} /> */}
          <Redirect from='*' to='/404' />
        </Switch>
      }
    </Router >
  );
}

export default App;
