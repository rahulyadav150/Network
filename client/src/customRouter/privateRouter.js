import react from 'react';
import {Route,Redirect } from 'react-router-dom'
function PrivateRouter(props){
  
    const firstLogin =localStorage.getItem('firstLogin')
    
    return firstLogin ? <Route {...props}/> : <Redirect to='/'/>
    
}
export default PrivateRouter;