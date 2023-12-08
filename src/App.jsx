import { createContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from './component/front/Header';
import './css/Header.css';
import Home from './component/front/Home';
import Cart from './component/front/Cart';
import Footer from './component/front/Footer';
import SignUp from './component/front/SignUp';
import Nomath from './component/front/Nomath';

export const MyContext = createContext();

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  useEffect(() => {
    AOS.init({
      duration: 500,
    });
  }, []);

  

    return (
      <div>
        <MyContext.Provider value={{ addToCart,cartItems,setCartItems }}>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/signUp' element={<SignUp/>}/>
            <Route path='*' element={<Nomath/>} />
          </Routes>
          <Footer/>
        </MyContext.Provider>
      </div>
    );
  };

  export default App;