import react from 'react'
import UserCard from '../UserCard'
import FollowBtn from '../FollowBtn'
import {useSelector,useDispatch} from 'react-redux'
import {getSuggestion} from '../../redux/Actions/suggestionAction'



function RightSideBar(){
    const {Auth,Suggestion}  = useSelector(state =>state)
    const dispatch = useDispatch()
    return <>
    <div className = 'my-3'>
        <UserCard user = {Auth.user} />
        <div className = 'd-flex justify-content-between align-items-center my-2'>
            <h5 className = 'text-danger'>Suggestion for you</h5>
            
            {  !Suggestion.loading && <i className = 'fas fa-redo' 
             onClick = {()=> dispatch(getSuggestion(Auth.token))} style = {{cursor:'pointer'}} />
            }
        </div>
        
            {
              Suggestion.loading ? 
              <img className='d-block mx-auto my-4' style={{width:'100px'}} 
              src='https://i.gifer.com/ZZ5H.gif' alt = 'loading...' />
              : <div className = 'suggestions'>
                {
                    Suggestion.users.map(user =>(
                        <UserCard key = {user._id} user = {user}>
                            <FollowBtn user = {user}/>
                        </UserCard>
                    ))
                }
              </div>
            }
        

    </div>
    </>
}

export default RightSideBar