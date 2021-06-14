
import { Link } from 'react-router-dom'
import Avatar from './Avatar'


function UserCard({children, user, border, handleClose ,setShowFollowers,setShowFollowing}) {
    function handleCloseAll(){
        if(handleClose)
        handleClose();
        if(setShowFollowers)
        setShowFollowers(false)
        if(setShowFollowing)
        setShowFollowing(false)
    }
    
    return <>
      <div className={`d-flex p-2 align-items-center justify-content-between ${border}`} >
        <Link className='d-flex' to={`/profile/${user._id}`} onClick={handleCloseAll} style={{textDecoration:'none'}}>
            
                <Avatar src={user.avatar} size='lg' />
                <div className='ml-1'>
                    <span className='d-block'>{user.userName}</span>
                    <span style={{ opacity: '0.7' }}>{user.fullName}</span>
                </div>
              
        </Link>
        {children}
        </div>
    </>
}

export default UserCard;