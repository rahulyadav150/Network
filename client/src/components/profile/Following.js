import react from 'react'
import UserCard from '../../components/UserCard'
import FollowBtn from '../FollowBtn'
import {useSelector} from 'react-redux'

function Following({users,setShowFollowing})
{
const {Auth} = useSelector(state=>state)
return <>
     <div className='follow'>
         <div className='follow_box text-center'>
             <h5>Following</h5>
             <hr />
             {
              users.map(user=>(
                  
                  <UserCard 
                  key = {user._id} 
                  user = {user} 
                  setShowFollowing={setShowFollowing}>
                 { Auth.user._id!== user._id && <FollowBtn key={user._id}  user={user} />}
                  </UserCard>

              ))
              
              
              }

            <div className='close' onClick={()=>setShowFollowing(false)}>&times;</div>

         </div>
     </div>
 </>
}

export default Following