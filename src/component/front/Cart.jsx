import { useContext, useEffect, useState } from 'react';
import { MyContext } from '../../App';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, setCartItems } = useContext(MyContext);
  const [totalCost, setTotalCost] = useState(0);
  const [subTotalCost, setSubTotalCost] = useState(0);

  const shpping = 12;

  const [clickedWarningIndex, setClickedWarningIndex] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDanger, setShowDanger] = useState(false);

  useEffect(() => {
    // Load cart items from local storage when the component mounts
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, [setCartItems]);

  useEffect(() => {
    const cost = cartItems.reduce((acc, data) => acc + data.quantity * data.price, 0);
    setTotalCost(cost);
    setSubTotalCost(shpping + cost);
  }, [cartItems, shpping]);

  const handleWarningClick = (index) => {
    setClickedWarningIndex(index);
    setShowSuccess(true);
    setShowDanger(true);
  };

  const handleSuccessClick = () => {
    setShowSuccess(false);
    setShowDanger(false);
    setClickedWarningIndex(null);
  };

  const removeItem = (i) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(i, 1);
    setCartItems(updatedCartItems);
    setClickedWarningIndex(null);

    // Save updated cart items to local storage
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const add = (i) => {
    const updatedQuantity = [...cartItems];
    updatedQuantity[i].quantity += 1;
    setCartItems(updatedQuantity);

    // Save updated cart items to local storage
    localStorage.setItem('cartItems', JSON.stringify(updatedQuantity));
  };

  const minize = (i) => {
    const updatedQuantity = [...cartItems];
    if (updatedQuantity[i].quantity > 0) {
      updatedQuantity[i].quantity -= 1;
      setCartItems(updatedQuantity);
    } else {
      updatedQuantity.splice(i, 1);
      setCartItems(updatedQuantity);
    }

    // Save updated cart items to local storage
    localStorage.setItem('cartItems', JSON.stringify(updatedQuantity));
  };

  const check=()=>{
    window.scrollTo({
      top:0
    })
  }
  return (
    <Container className='cart'>
      <h1 className='text-center mt-3'>Shopping Cart</h1>
      {cartItems.map((data, i) => (
        <div key={i} className='d-flex flex-wrap s-cart container justify-content-between align-items-center my-2'>
          <div className='fw-bold'>{i + 1}.</div>
          <div>
            <img src={data.src} alt="" className='m-xs-5' style={{ width: '80px' }} />
          </div>
          <div>{data.title}</div>
          <div className='fw-bold'>${data.price}</div>
          <div className='d-flex align-items-center'>
            <button onClick={() => add(i)} className='d-flex justify-content-center align-items-center btn btn-dark fw-bold' >+</button>
            <div className='fw-bold px-1'>{data.quantity}</div>
            <button onClick={() => minize(i)} className='d-flex justify-content-center align-items-center btn btn-secondary' style={{width:'35px',height:'40px'}} >-</button>
          </div>
          <div>
            {clickedWarningIndex === i && (
              <>
                <button className='btn btn-success mx-1' onClick={handleSuccessClick}>
                  <i className='bi bi-check'></i>
                </button>
                <button className='btn btn-danger mx-1' onClick={() => removeItem(i)}>
                  <i className='bi bi-x'></i>
                </button>
              </>
            )}
            {clickedWarningIndex !== i && (
              <button className='btn btn-warning mx-1' onClick={() => handleWarningClick(i)}>
                <i className='bi bi-pencil-fill'></i>
              </button>
            )}
          </div>
        </div>
      ))}
      {cartItems.length !== 0 && (
        <div>
          <div className='text-end h5'>Total: ${totalCost}</div>
          <div className='text-end h5'>Shipping: ${shpping}</div>
          <hr />
          <div className='text-end h5'>Sub Total: ${subTotalCost}</div>
          <hr />
          <div className='d-flex justify-content-end'>
            <Link to='/signUp'><button className='btn btn-dark' onClick={check}>Checkout</button></Link>
          </div>
        </div>
      )}
      {cartItems.length === 0 && (
        <div className='h2 text-center mt-5 fw-bold'>No Items Added In Cart <i key={1} className="bi bi-cart3"></i></div>
      )}
    </Container>
  );
};

export default Cart;
