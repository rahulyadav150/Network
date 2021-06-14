
import {useSelector} from 'react-redux'

function Like({isLike,handleLike,handleUnLike}){
    
    const {Theme}  = useSelector(state=>state)
    
    
    return <>
       {
           isLike ? 
           <i className = 'fas fa-heart text-danger'  onClick = {handleUnLike} 
             style = {{filter : Theme ? 'invert(1)' : 'invert(0)'}} /> :
           <i className = 'far fa-heart'  onClick = {handleLike}/>
       }
    </>
}
export default Like