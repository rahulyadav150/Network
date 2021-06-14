
import Menu from './Menu'
import Search from './Search'
import { Link} from 'react-router-dom'



function Header() {
    


    return (<>
        <div className="header bg-light">
            <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between ">
                <Link  className='logo' to="/">
                 <h1 className="navbar-brand text-uppercase" onClick = {()=>window.scrollTo(0,0)}>
                  QNetwork
                 </h1>
                </Link>
                 <Search />
                <Menu />
            </nav>
        </div>


    </>)
}


export default Header;