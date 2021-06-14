
import {useDispatch, useSelector } from 'react-redux'
import Avatar from '../Avatar';
import {Types} from '../../redux/Actions/globalTypes'



function Status(){
    const {Auth} = useSelector(state=>state); 
    const dispatch = useDispatch()
    return <>
      <div className = 'status d-flex my-3'>
     <Avatar src={Auth.user.avatar} size='lg'/>
     <button className = 'statusBtn flex-fill' onClick={()=>dispatch({type:Types.Status,payload:true})} >
         {Auth.user.userName}, what are you thinking ?
     </button>
    </div>
    </>
}

export default Status;