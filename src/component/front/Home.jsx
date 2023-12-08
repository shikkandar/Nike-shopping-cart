import { useContext, useState, useEffect } from 'react';
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
    window.scrollTo(0, 0); 
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
      }, 1500);
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
    }, 1500);
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
          <div data-aos='slide-left' data-aos-duration="600"  data-aos-easing="ease-in-out" className="alert-mesage p-2 text-center fw-bold d-flex justify-content-arround align-items-center" style={{backgroundColor:'#A8F1C6',color:'#133C23'}} >
            <div>{isShowAdd} Added in cart</div> <svg className='alert-svg' style={{backgroundColor:'#188344'}} xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path fill="#73ca93" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
            <div className="progress-line " style={{backgroundColor:'#188344'}}></div>
          </div>
        ) : null}
        {isShowRemove.length !== 0 ? (
          <div data-aos='slide-left' data-aos-duration="600" className="alert-mesage p-2 text-center  fw-bold d-flex justify-content-arround align-items-center" style={{backgroundColor:'#FF9A9E',color:'rgb(126, 21, 42'}}>
              <div>{isShowRemove} Removed in cart</div><svg className='alert-svg' xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path fill="#cd7570" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
            <div className="progress-line " style={{backgroundColor:'crimson'}}></div>
          </div>
        ) : null}
      </div>
      <Container className='d-flex justify-content-center mt-5 '>
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
