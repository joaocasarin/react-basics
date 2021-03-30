import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import CreateProject from './pages/CreateProject/CreateProject';
import Home from './pages/Home/Home';
import ListProjects from './pages/ListProjects/ListProjects';
import DeleteProject from './pages/DeleteProject/DeleteProject';

function App() {
    return(
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route path="/" exact component={ Home } />
                <Route path="/createProject" exact component={ CreateProject } />
                <Route path="/listProjects" exact component={ ListProjects } />
                <Route path="/deleteProject" exact component={ DeleteProject }/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;