import './App.scss'
import Footer from './Components/Footer/Footer'
import ItemContainer from './Components/ItemContainer/ItemContainer'
import DetailContainer from './Components/ItemContainer/ProductsList/DetailContainer/DetailContainer'
import NavBar from './Components/NavBar/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Components/SesionAccess/Login/Login'
import { UserProvider } from './Contexts/userContext'
import Register from './Components/SesionAccess/Register/Register'
import { CartProvider } from './Contexts/CartContext'
import Cart from './Components/Cart/Cart'
import ClearCart from './Components/NavBar/ClearCart/ClearCart'


function App() {

  return (

    <UserProvider>

      <CartProvider>

        <BrowserRouter>

          <NavBar />

          <Routes>
            <Route path='/' element={<ItemContainer />} />
            <Route path='/products/:categoryId' element={<ItemContainer />} />
            <Route path='/products/details/:prodId' element={<DetailContainer />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/clear' element={<ClearCart/>}/>
            <Route path="*" element={<ItemContainer />} />
          </Routes>

          <Footer />

        </BrowserRouter>

      </CartProvider>

    </UserProvider>

  )
}

export default App
