import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Addproduct from './pages/addproduct'
import Listproduct from './pages/listproduct'
import Order from './pages/order'
import Sidebar from './components/sidebar'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sidebar />}>
          <Route path="/addProduct" element={<Addproduct />} />
          <Route path="/productlist" element={<Listproduct />} />
          <Route path="/orders" element={<Order />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App