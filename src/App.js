import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/register.component";
import Rol from "./components/views/rol.component";
import Main from "./Main";

function App() {
  return (<Router>
              <div className="App">
                    <Switch>
                      <Route exact path='/' component={Login} />
                      <Route path="/sign-in" component={Login} />
                      <Route path="/sign-up" component={SignUp} />
                      <Route path="/rol" component={Rol} />
                      <Route path="/inicio" component={Main} />
                    </Switch>
              </div>
            </Router>
  );
}

export default App;
