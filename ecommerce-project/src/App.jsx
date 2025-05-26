import {OrderPage} from './pages/OrderPage'
import {HomePage} from './pages/HomePage'
import {Checkout} from './pages/checkout/CheckoutPage'
import { Tracking } from './pages/TrackingPage'
import './App.css'
import { Routes,Route } from 'react-router'
import {useEffect,useState} from 'react'
import axios from 'axios';


function App() {
  const [cart ,setCart] = useState([]);
  useEffect(()=>{
  axios.get('/api/cart-items')
    .then((response)=>{
      setCart(response.data);
      
    })
 },[])
  

  return (
   
    <Routes>
      <Route index element={<HomePage cart={cart}/>} />
      <Route path="checkout" element={<Checkout  cart={cart}/>} />
      <Route path="orders" element={<OrderPage />} />
      <Route path="tracking" element ={<Tracking />} />

    </Routes>
      
   
  )
}

export default App
