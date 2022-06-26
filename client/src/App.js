import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import {Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CreateGame from './components/CreateGame';
import Detail from './components/Detail';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
      <Route exact path= '/' component= {LandingPage}/>
      <Route exact path= '/home' component= {Home}/>
      <Route exact path= '/videogame' component= {CreateGame}/>
      <Route exact path= '/home/:id' component= {Detail}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
