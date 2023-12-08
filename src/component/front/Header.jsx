import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from '../../img/Nike-logo-icon-on-transparent-background-PNG.png';
import { MyContext } from '../../App';

const navItems = ['Product', 'SignUp', <i key={1} className="bi bi-cart3"></i>];
const navRoutes = ['/', '/signUp', '/cart'];

const Header = () => {
  const { cartItems } = useContext(MyContext);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(cartItems.length);
  }, [cartItems]);

  const navLinksActive = ({ isActive }) => {
    return {
      color: isActive ? "white" : "black",
      backgroundColor: isActive ? "#000" : "transparent",
      borderRadius: isActive ? "5px" : "none",
    };
  };
  
  const scrollToTop=()=>{
    window.scrollTo({
      top:0,
      behavior:'smooth'
    }
      
    )
  }
  const scroll = () => {
    window.scrollTo(0, 0);
  };
  

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary shadow p-0" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
      <Container fluid >
        <Navbar.Brand as={NavLink} to='/' className="hstack text-decoration-none">
          <h2 className='h1'>Nike</h2>
          <img src={logo} alt='nike' width={100} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
          <Nav>
            {navItems.map((data, i) => (
              <Nav.Link
                key={i}
                onClick={scroll}
                as={NavLink}
                style={navLinksActive}
                className="text-decoration-none  p-2 px-3 mx-2 fw-bold"
                to={navRoutes[i]}
              >
                {data}
              </Nav.Link>
            ))}
          </Nav>

        </Navbar.Collapse>
          <div className='count d-flex justify-content-center align-items-center'>{count}</div>
      </Container>
    </Navbar>

    <div className='tools'>
      <div onClick={scrollToTop} className='tool bg-dark d-flex justify-content-center align-items-center mb-1' ><svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path fill="#ffffff" d="M246.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 109.3 361.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160zm160 352l-160-160c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 301.3 361.4 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3z"/></svg></div>
      <div onClick={scroll} className='tool bg-dark d-flex justify-content-center align-items-center' ><NavLink to='/cart'><svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path fill="#ffffff" d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg></NavLink></div>
    </div>
    </>
  );
};

export default Header;
