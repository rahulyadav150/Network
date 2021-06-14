

import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/Actions/authAction'
import Avatar from '../Avatar'


function Menu() {

    const dispatch = useDispatch();
    const navLinks = [
        { label: 'Home', icon: 'home', path: '/' },
        { label: 'Message', icon: 'near_me', path: '/message' },
        { label: 'Discover', icon: 'explore', path: '/discover' },
        { label: 'Notify', icon: 'favorite', path: '/notify' }
    ]
    const { pathname } = useLocation();
    const { Auth, Theme} = useSelector(state => state);

    function isActive(pn) {
        if (pn === pathname) {
            return 'active';
        }
    }

    return <>
        <div className="menu" id="navbarSupportedContent">
           
            <ul className="navbar-nav flex-row">
              
                   { navLinks.map((link, index) => (
                        <li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
                            <Link className="nav-link" to={link.path}>
                                <span className="material-icons">
                                    {link.icon}
                                </span>
                            </Link>
                        </li>
                    ))
                }
                 <li className="nav-item dropdown menu_avatar  " >
                    <a className="nav-link dropdown-toggle " href = '/soisso' id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <Avatar src={Auth.user.avatar} size='md' />
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link className="dropdown-item" to={`/profile/${Auth.user._id}`}>Profile</Link>
                        <label htmlFor='theme' className="dropdown-item" onClick={() => {
                            dispatch({ type: 'THEME', payload: !Theme })
                           
                        }}>
                            {Theme ? 'Light mode' : 'Dark mode'}
                        </label>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to='/logout' onClick={() => dispatch(logout())}>Logout</Link>
                    </div>
                </li>

            </ul>

        </div>
    </>
}

export default Menu