import React from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import MainPage from './view/pages/MainPage';
import {RepoPage} from './view/pages/RepoPage';
import {store} from './redux/store';
import {Provider} from 'react-redux';

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="App">
                    <Route exact path={"/"} render={() => <MainPage/>}/>
                    <Route exact path={"/repo/:ownerName/:repoName"} render={() => <RepoPage/>}/>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
