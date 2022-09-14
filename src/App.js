//rafc
import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Orders from './components/Orders/Orders';
import CreateOrder from './components/Orders/createOrder';
import Products from './components/Products/createProduct';
import CreateProduct from './components/Products/products';




const App = () => {
  return (
    <>
      <Routes>
                <Route index path="/" element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path="/order" element={<Orders />} />
                <Route path="/createorder" element={<CreateOrder />} />
                <Route path='/createProduct' element={<Products />} />
                <Route path='/product' element={<CreateProduct />} />
                
            </Routes>
    </>
  )
}

export default App;

