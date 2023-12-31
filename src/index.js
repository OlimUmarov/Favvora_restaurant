import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import './index.css';
import App from './App';
import Favourite from "./pages/Favourite";
import Home from "./pages/Home";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Routes>
          <Route path='/' element={<App/>}>
              <Route index element={<Home/>}/>
              <Route path="favourite" element={<Favourite/>}/>
          </Route>
      </Routes>
  </BrowserRouter>


);
