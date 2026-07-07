
import './App.css'
import { HomePage } from './Pages/Home/HomePage';
import { BookMarkPage } from './Pages/BookMark/BookMarkPage';
import { DetailsPage } from './Pages/Details/DetailsPage';
import { Routes, Route } from 'react-router';
import { useState, useEffect } from 'react'
import axios from 'axios'
import { CheckoutPage } from './Pages/Checkout/CheckoutPage';
function App() {
  const [cart, setCart] = useState([])
  const loadCart = async () => {
    const response = await axios.get('/api/cart-items/?expand=course')
    setCart(response.data)
  }
  useEffect(() => {
    loadCart();
  }, [])

  return (
    <Routes>
      <Route path="/" element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route path="/bookmarks" element={<BookMarkPage cart={cart}/>} />
      <Route path="/courseDetails" element={<DetailsPage />} />
      <Route path="/checkout" element={<CheckoutPage cart={cart} loadCart={loadCart}/>}></Route>
    </Routes>
  )
}

export default App
