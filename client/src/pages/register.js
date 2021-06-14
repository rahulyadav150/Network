import react, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../redux/Actions/authAction';

function Register() {
    const { Auth, Alert } = useSelector(state => state);
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        if (Auth.token) history.push('/');
    }, [Auth.token, history])

    const [typePass, setTypePass] = useState(false);
    const [cfPass, setCfPass] = useState(false);
    const initialState = { fullName: '', userName: '', email: '', password: '', cfPass: '', gender: 'male' };
    var [userdata, setUserData] = useState(initialState);

    const handleChangeInput = (event) => {

        const field = event.target.name;
        setUserData({ ...userdata, [field]: event.target.value });

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(register(userdata));




    }
    return (
        <>

            <div className='auth_page'>
                <form onSubmit={handleSubmit}>
                    <h3 className="text-uppercase mb-4 text-center">QNetwork</h3>

                    <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input type="text" className="form-control " name='fullName' id="fullName" onChange={handleChangeInput} value={userdata.fullName} required
                            style={{ background: `${Alert.fullName ? '#fd2d6a14' : ''} ` }} />
                        {Alert.fullName && <small className="form-text text-danger" >{Alert.fullName}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="userName">User Name</label>
                        <input type="text" className="form-control " name='userName' id="userName" onChange={handleChangeInput} value={userdata.userName.toLowerCase().replace(/ /g, '')} required
                            style={{ background: `${Alert.userName ? '#fd2d6a14' : ''} ` }} />
                        {Alert.userName && <small className="form-text text-danger" >{Alert.userName}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control email" name='email' id="email" onChange={handleChangeInput} value={userdata.email} required
                            style={{ background: `${Alert.email ? '#fd2d6a14' : ''} ` }} />
                        {Alert.email && <small className="form-text text-danger" >{Alert.email}</small>}

                    </div>


                    <div className="form-group">
                        <div className='pass'>
                            <label htmlFor="password">Password</label>
                            <input type={typePass ? 'text' : 'password'} className="form-control password" name='password' id="password" onChange={handleChangeInput} value={userdata.password} required
                                style={{ background: `${Alert.password ? '#fd2d6a14' : ''} ` }} />
                            <small onClick={() => { setTypePass(!typePass) }}>
                                {typePass ? 'Hide' : 'Show'}</small>


                        </div>
                        {Alert.password && <small className="form-text text-danger" >{Alert.password}</small>}
                    </div>

                    <div className="form-group">
                        <div className='pass'>
                            <label htmlFor="cfPassword"> Confirm Password</label>
                            <input type={cfPass ? 'text' : 'password'} className="form-control" name='cfPass' id="cfPassword" onChange={handleChangeInput} value={userdata.cfPass} required
                                style={{ background: `${Alert.cfPass ? '#fd2d6a14' : ''} ` }} />
                            <small onClick={() => { setCfPass(!cfPass) }}>
                                {cfPass ? 'Hide' : 'Show'}</small>

                        </div>
                        {Alert.cfPass && <small className="form-text text-danger" >{Alert.cfPass}</small>}
                    </div>

                    <div className='row justify-content-between mb-1 mx-0'>
                        <label htmlFor='male'>
                            Male: <input className type='radio' name='gender' id='male' value='male' defaultChecked onChange={handleChangeInput} />
                        </label>
                        <label htmlFor='female'>
                            Female: <input type='radio' id='female' name='gender' value='female' onChange={handleChangeInput} />
                        </label>
                        <label htmlFor='other'>
                            Other: <input type='radio' id='other' name='gender' value='other' onChange={handleChangeInput} />
                        </label>
                    </div>

                    <button type="submit" className="btn btn-dark w-100 " disabled={userdata.email && userdata.password && userdata.cfPass && userdata.fullName && userdata.userName ? false : true}>Sign Up</button>
                    <p className='my-2'>Already have an account? <Link to='/' style={{ color: 'crimson' }}>Login Now</Link></p>
                </form>

            </div>
        </>)


}
export default Register;