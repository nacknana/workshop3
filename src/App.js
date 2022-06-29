import './App.css';
import React from 'react';
import { Route, Routes } from "react-router-dom"


import Navbar from './NShop/layout/Navbar';
import Home from './NShop/page/Home';
import About from './NShop/page/About';
import Contact from './NShop/page/Contact';
import Login from './NShop/page/Login';
import Register from './NShop/page/Register';
import ProductDetail from './NShop/page/ProductDetail';
import Footer from './NShop/layout/Footer';
import Cart from './NShop/page/Cart';
import Page404 from './NShop/page/Page404';

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
        <Route path="/cart" element={<Cart />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/*' element={<Page404 />} />
      </Routes>
      <Footer />


    </>

  );
}

export default App;
