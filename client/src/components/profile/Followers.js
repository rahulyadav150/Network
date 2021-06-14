import react from 'react'
import UserCard from '../../components/UserCard'
import FollowBtn from '../FollowBtn'
import {useSelector} from 'react-redux'

function Followers({users,setShowFollowers})
{
const {Auth} = useSelector(state=>state)
return <>
     <div className='follow'>
         <div className='follow_box text-center'>
             <h5>Followers</h5>
             <hr />
             {
              users.map(user=>(
                  
                  <UserCard 
                  key = {user._id} 
                  user = {user} 
                  setShowFollowers={setShowFollowers}>
                 { Auth.user._id!== user._id && <FollowBtn key={user._id}  user={user} />}
                  </UserCard>

              ))
              
              
              }

            <div className='close' onClick={()=>setShowFollowers(false)}>&times;</div>

         </div>
     </div>
 </>
}

export default Followers