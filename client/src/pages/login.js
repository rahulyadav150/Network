import react, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../redux/Actions/authAction';
import { useDispatch, useSelector } from 'react-redux'



function Login() {

  const [typePass, setTypePass] = useState(false);
  const initialState = { email: '', password: '' };
  var [userdata, setUserData] = useState(initialState);
  const { Auth } = useSelector((state) => state);
  const history = useHistory();





  useEffect(() => {
    if (Auth.token) history.push('/');
  }, [Auth.token, history])

  const handleChangeInput = (event) => {

    const field = event.target.id;
    setUserData({ ...userdata, [field]: event.target.value });


  }
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(userdata))

  }
  return (<>

    <div className='auth_page'>
      <form onSubmit={handleSubmit}>
        <h3 className="text-uppercase mb-4 text-center">QNetwork</h3>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control email" id="email" onChange={handleChangeInput} value={userdata.email} />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <div className='pass'>
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type={typePass ? 'text' : 'password'} className="form-control password" id="password" onChange={handleChangeInput} value={userdata.password} />
            <small style={{ cursor: 'pointer' }} onClick={() => { setTypePass(!typePass) }}>
              {typePass ? 'Hide' : 'Show'}</small>
          </div>
        </div>


        <button type="submit" className="btn btn-dark w-100 " disabled={userdata.email && userdata.password ? false : true}>Login</button>
        <p className='my-2'>Don't have an account? <Link to='/register' style={{ color: 'crimson' }}>Register Now</Link></p>
      </form>

    </div>
  </>)
}
export default Login;