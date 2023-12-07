  import React, { useContext, useState, useEffect } from 'react';
  import { ShoeContext } from '../back/data/Data';
  import Image from 'react-bootstrap/Image';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import { Container, Button } from 'react-bootstrap';

  import { MyContext } from '../../App';

  const Home = () => {
    const { products } = useContext(ShoeContext);
    const { addToCart, cartItems, setCartItems } = useContext(MyContext);
  
    const [isShowAdd, setIsShowAdd] = useState('');
    const [isShowRemove, setIsShowRemove] = useState('');
    //pagination
    const[curentPage,setCurrentPage]=useState(1)
    const itemsPerPage=20;
    const lastIndex=curentPage*itemsPerPage;
    const firstIndex=lastIndex-itemsPerPage

    const paginate=(i)=>{
      setCurrentPage(i)
    }
    const currentProducts=products.slice(firstIndex,lastIndex)
    // cart added or not checking function
    const isItemCart = (productId) => {
      return !!cartItems.find((data) => data.productId === productId);
    };
  
    useEffect(() => {
      // Load cart items from local storage when the component mounts
      const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      setCartItems(storedCartItems);
    }, [setCartItems]);
  
    const addToBag = (productId, title, src, price) => {
      const isItemBag = cartItems.find((item) => item.productId === productId);
  
      if (!isItemBag) {
        const newCartItem = { productId, title, src, price, quantity: 1 };
        addToCart(newCartItem);
  
        // Save updated cart items to local storage
        localStorage.setItem('cartItems', JSON.stringify([...cartItems, newCartItem]));
        setIsShowAdd(title);
        setTimeout(() => {
          setIsShowAdd('');
        }, 1000);
      } else {
        alert(`${title}: already added in the list`);
      }
    };
  
    // remove data from bag
    const removeFromCart = (productId, title) => {
      const updatedCart = cartItems.filter((data) => data.productId !== productId);
      setCartItems(updatedCart);
  
      setIsShowRemove(title);
      setTimeout(() => {
        setIsShowRemove('');
      }, 1000);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    };
  
    return (
      <Container fluid className='mt-5'>
        <div className="d-flex flex-wrap gap-5 justify-content-center align-items-center " style={{minHeight:'70vh'}}>
          {currentProducts.map((data, i) => (
            <div key={i} style={{ width: '22rem' }} className='d-flex flex-column ' data-aos="zoom-in-up">
              <Image src={data.src} fluid />
              <div className='px-2'>
                <p className='h4'>{data.title}</p>
                <p>{data.description}</p>
                <p className='h4'>${data.price}</p>
              </div>
              {isItemCart(data._id) ? (
                <Button
                  onClick={() => removeFromCart(data._id, data.title)}
                  className='w-100 mx-5 align-self-center btn-secondary fw-bold'
                >
                  Remove from cart
                </Button>
              ) : (
                <Button
                  onClick={() => addToBag(data._id, data.title, data.src, data.price)}
                  className='w-100 mx-5 align-self-center btn-dark fw-bold'
                >
                  Add to bag
                </Button>
              )}
            </div>
          ))}
          {isShowAdd.length !== 0 ? (
            <div data-aos='slide-left' data-aos-duration="300"  data-aos-easing="ease-in-out" className="alert-mesage px-3 text-center fw-bold" style={{backgroundColor:'#7FFF00'}} >
              {isShowAdd} Added in cart
              <div className="progress-line " style={{backgroundColor:'#F50057'}}></div>
            </div>
          ) : null}
          {isShowRemove.length !== 0 ? (
            <div data-aos='slide-left' className="alert-mesage text-center text-white fw-bold " style={{backgroundColor:'#F50057'}}>
              {isShowRemove} Removed in cart
              <div className="progress-line " style={{backgroundColor:'#7FFF00'}}></div>
            </div>
          ) : null}
        </div>
        <Container className='d-flex justify-content-center mt-5'>
        {Array.from({ length: Math.ceil(products.length / itemsPerPage) }, (_, i) => (
          <button className='btn btn-dark mx-2' key={i + 1} onClick={() => paginate(i + 1)}>
            {i + 1}
          </button>
        ))}
        </Container>

      </Container>
    );
  };
  
  export default Home;
