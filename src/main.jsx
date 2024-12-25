import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store'
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login.jsx";
import Feed from './Components/Feed.jsx';
import Profile from './Components/Profile.jsx';
import Search from './pages/search.jsx';
import PostDetails from './pages/post-details.jsx';




const root = ReactDOM.createRoot(document.body);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<App />} >
            <Route path='/' element={<Feed />} />
            <Route path='/profile/:user_id' element={<Profile />} />
            <Route path='/post/:post_id' element={<PostDetails />} />
          <Route path='/search' element={<Search />} />
          </Route>
          <Route path='/signup' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
