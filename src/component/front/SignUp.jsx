import '../../css/Header.css'
const SignUp = () => {
  return (
    <div className='signUp fluid d-flex justify-content-center align-items-center'>
  <div class="wrapper">
    <form action="#">
      <h2 className='text-light'>Login</h2>
        <div className="input-field">
        <input type="text" required/>
        <label>Enter your email</label>
      </div>
      <div className="input-field">
        <input type="password" required/>
        <label>Enter your password</label>
      </div>
      <div className="forget">
        <label for="remember">
          <input type="checkbox" className='mb-3' id="remember"/>
          <p>Remember me</p>
        </label>
        <a href="#">Forgot password?</a>
      </div>
      <button type="submit">Log In</button>
      <div className="register">
        <p>Don't have an account? <a href="#">Register</a></p>
      </div>
    </form>
  </div>

    </div>
  )
};

export default SignUp