import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import {Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
      <Route exact path= '/' component= {LandingPage}/>
      <Route path= '/home' component= {Home}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
