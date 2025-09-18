/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/home';
import Cart from './pages/cart';
import Checkout from './pages/checkout';
import Orders from './pages/orders';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Context from './context/context';
function App() {
  return (
    <>
    <BrowserRouter>
      <Context>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/orders' element={<Orders/>}/>
      </Routes>
      <Footer/>
      </Context>
    </BrowserRouter>
    </>
  )
}

export default App
