import react, { useState, useEffect } from 'react'

import Avatar from '../Avatar'
import EditProfile from '../profile/EditProfile'
import FollowBtn from  '../FollowBtn'
import Followers from '../profile/Followers'
import Following from '../profile/Following'

function Info({Auth,Profile,id,dispatch}) {
   
    
    const [userData, setUserData] = useState([]);
    const [onEdit, setOnEdit] = useState(false);
    const [showFollowers,setShowFollowers] = useState(false)
    const [showFollowing,setShowFollowing] = useState(false)

    useEffect(() => {
        if (id === Auth.user._id)
            setUserData([Auth.user])
        else {
           
            const newData = Profile.users.filter(user => user._id === id)
            setUserData(newData);
        }

    }, [id, Auth,Profile,dispatch])


useEffect(()=>{
    if((showFollowers || showFollowing || onEdit) )
    dispatch({type:'MODAL',payload: true})
    else
    {
        dispatch({type:'MODAL',payload: false})
    }
},[showFollowers,showFollowing,onEdit,Auth,dispatch])


    
    return <>
        <div className='info'>
            {
                userData.map((user) => (           // userdata is an array of one element which is  clicked   profile
                    <div className='info_container' key={user._id} >
                        <Avatar src={user.avatar} size='super' />

                        <div className='info_content' >

                            <div className='info_content_title'>
                                <h2>{user.userName} </h2>
                                {   user._id === Auth.user._id ?
                                    <button className='btn btn-outline-info'
                                        onClick={() => setOnEdit(true)} >
                                        Edit Profile
                                    </button>
                                    : <FollowBtn user={user}/> // user whose profile we are seeing
                                }
                            </div>


                            <div className="follow_btn">
                                <span className='mr-4' onClick={()=>setShowFollowers(true)}>{user.follower.length} Followers </span>
                                <span className='ml-4' onClick={()=>setShowFollowing(true)}>{user.following.length} Following</span>
                            </div>
                            <h6 className='m=0'>{user.fullName} <span className='text-danger'>{user.mobile}</span></h6>
                            <p className='m-0'>{user.address}</p>
                            <h6 className='m-0'>{user.email}</h6>
                            <a href={user.website} target='_blank' rel='noreferrer'>{user.website}</a>
                            <p>{user.story}</p>
                        </div>
                            
                           { onEdit && <EditProfile
                            setOnEdit={setOnEdit} />
                           }


                        {
                            showFollowers && <Followers users={user.follower}  setShowFollowers={setShowFollowers} />
                        }

                        {
                            showFollowing && <Following users={user.following}  setShowFollowing={setShowFollowing} />
                        }

                    </div>

                ))
            }
        </div>
    </>


}
export default Info;