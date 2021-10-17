import React from "react";
import { Route, Switch } from "react-router-dom";

import SearchPage from "./components/searchPage";

function App() {
  return (
      <div className="App">
        <Switch>
          <Route path="/" component={SearchPage} exact />
        </Switch>
      </div>
  );
}

export default App;
