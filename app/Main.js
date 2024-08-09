// import React, { useState, useReducer } from 'react';
import ReactDOM from 'react-dom/client';
import { useImmerReducer } from 'use-immer';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Axios from 'axios';
Axios.defaults.baseURL = 'http://localhost:8080';

import StateContext from './StateContext';
import DispatchContext from './DispatchContext';

// My Components
import Header from './components/Header';
import HomeGuest from './components/HomeGuest';
import Home from './components/Home';
import Footer from './components/Footer';
import About from './components/About';
import Terms from './components/Terms';
import CreatePost from './components/CreatePost';
import ViewSinglePost from './components/ViewSinglePost';
import FlashMessages from './components/FlashMessages';

function Main() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem('complexappToken')),
    flashMessages: [],
  };

  // function ourReducer(state, action) {

  function ourReducer(draft, action) {
    switch (action.type) {
      case 'login': {
        draft.loggedIn = true;
        return;
      }
      case 'logout': {
        draft.loggedIn = false;
        return;
      }
      case 'flashMessage': {
       draft.flashMessages.push(action.value);
       return;
      }
    }
  }

  // const [state, dispatch] = useReducer(ourReducer, initialState);

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  function addFlashMessage(msg) {
    setFlashMessages((prev) => prev.concat(msg));
  }

  return (
    // <ExampleContext.Provider value={addFlashMessage}>
    // <ExampleContext.Provider value={{ addFlashMessage, setLoggedIn }}>
    // <ExampleContext.Provider value={{ state, dispatch }}>

    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          {/* <FlashMessages messages={flashMessages} /> */}
          <FlashMessages messages={state.flashMessages} />

          <Header />
          <Routes>
            <Route
              path="/"
              element={state.loggedIn ? <Home /> : <HomeGuest />}
            />
            <Route path="/post/:id" element={<ViewSinglePost />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.querySelector('#app'));
root.render(<Main />);

if (module.hot) {
  module.hot.accept();
}

// dispatch({ type: 'login' });

// const [loggedIn, setLoggedIn] = useState(
//   Boolean(localStorage.getItem('complexappToken'))
// );
// const [flashMessages, setFlashMessages] = useState([]);
