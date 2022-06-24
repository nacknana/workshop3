import './App.css';
import React from 'react';
import { Route, Routes } from "react-router-dom"


import Navbar from './component/layout/Navbar';
import Home from './component/page/Home';
import About from './component/page/About';
import Contact from './component/page/Contact';
import Login from './component/page/Login';
import Register from './component/page/Register';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/category/:id" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>

  );
}

export default App;
