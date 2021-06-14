import  { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { follow, UnFollow } from '../redux/Actions/profileAction'

function FollowBtn({ user }) {

  const [followed, setFollowed] = useState(false)
  const { Auth, Profile } = useSelector(state => state)
  const dispatch = useDispatch()
  const [load, setLoad] = useState(false)

  useEffect(() => {
    if (Auth.user.following.find(item => item._id === user._id))
      setFollowed(true);
  }, [Auth.user, Profile, user])

  const handleFollow = async () => {
    if (load) return;

    setLoad(true)
    setFollowed(true)
    await dispatch(follow({ user: user, Auth }))
    setLoad(false)
  }


  const handleUnFollow = async() => {
    if (load) return;

    setLoad(true)
    setFollowed(false)
    await dispatch(UnFollow({ user: user, Auth }))
    setLoad(false)
  }


  return <>
    {
      followed ?
        <button onClick={handleUnFollow} className='btn btn-outline-danger' >Unfollow</button> :
        <button onClick={handleFollow} className='btn btn-outline-info' >Follow</button>

    }

  </>
}

export default FollowBtn