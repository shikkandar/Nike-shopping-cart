import nomatch from '../../img/blue.png'
import Image from 'react-bootstrap/Image';
const Nomath = () => {
  return (
    <div className='d-flex justify-content-center align-items-center' style={{minHeight:'80vh'}}>
        <Image src={nomatch} fluid/>
    </div>
  )
}

export default Nomath