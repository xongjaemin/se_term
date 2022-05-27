import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Landing from './pages/landing/Landing';
import Login from './pages/Login/Login';
import Register from './pages/Login/Register';
import ServiceList from './pages/service/ServiceList';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/service_list' element={<ServiceList/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
