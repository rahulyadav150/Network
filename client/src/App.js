import { useEffect} from "react"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './styles/global.css'
import PageRender from './customRouter/pageRender'
import Login from './pages/login'
import Notify from './components/notify/Notify'
import { useSelector, useDispatch } from 'react-redux'
import Home from './pages/home'
import { refreshToken } from './redux/Actions/authAction'
import Header from "./components/header/Header"
import Register from './pages/register'
import PrivateRouter from './customRouter/privateRouter'
import StatusModal from './components/StatusModal'
import {getPosts} from './redux/Actions/postAction'
import {getSuggestion} from './redux/Actions/suggestionAction'

function App() {
    const { Auth,Status ,Modal,Theme} = useSelector(state => state)
    const dispatch=useDispatch();
    useEffect(()=> {
        dispatch(refreshToken());
    },[dispatch])

    useEffect(()=> {
        if(Auth.token)
       { dispatch(getPosts(Auth.token))
        dispatch(getSuggestion(Auth.token))
       }
},[dispatch,Auth.token])


    return (<Router>

        <Notify />
        <input type='checkbox' id='theme' />
         <div className={`App ${ ( Modal || Status) && 'mode'}`}>
            <div className='main'>
            {Auth.token && <Header /> }
            {Status && <StatusModal />}
            
                <Switch>
                    <Route exact path='/' component={Auth.token ? Home : Login} />
                    <Route exact path='/register' component={Register} />
                    <PrivateRouter exact path='/:name' component={PageRender} />
                    <PrivateRouter excat path='/:name/:id' component={PageRender} />
                </Switch>
            </div>
        </div>
    </Router>);
}
export default App;