import {OrderPage} from './pages/OrderPage'
import {HomePage} from './pages/HomePage'
import {Checkout} from './pages/checkout/CheckoutPage'
import { Tracking } from './pages/TrackingPage'
import './App.css'
import { Routes,Route } from 'react-router'


function App() {
  

  return (
   
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="orders" element={<OrderPage />} />
      <Route path="tracking" element ={<Tracking />} />

    </Routes>
      
   
  )
}

export default App
