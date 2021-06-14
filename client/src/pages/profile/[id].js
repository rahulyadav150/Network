import react,{useEffect,useState} from 'react'
import Info from '../../components/profile/Info'
import Posts from '../../components/profile/Posts'
import {useSelector,useDispatch} from 'react-redux'
import { getProfileUsers } from '../../redux/Actions/profileAction'
import {useParams} from 'react-router-dom'
import Saved from '../../components/profile/Saved'

function Profile(){
    const { id } = useParams();
    const { Auth, Profile } = useSelector(state => state)
    const [saveTab , setSaveTab] = useState(false)
    const state = useSelector(state=>state)
    const dispatch = useDispatch()
   
    useEffect(()=>{
        if(Profile.ids.every(item => item!==id)){
           dispatch(getProfileUsers({ users: Profile.users, id, Auth }))
        }
        
    },[Profile.ids,id,Profile.users,dispatch,Auth])
    return <>
    <div className = 'profile'>
     <Info Auth = {Auth} Profile = {Profile} id = {id} dispatch = {dispatch} /> 
      { Auth.user._id === id && 
        <div className = "profile_tab">
        <button className ={saveTab? '':'active'} onClick = {()=>{setSaveTab(false)}} >Posts</button>
        <button className ={saveTab? 'active':''} onClick = {()=>{setSaveTab(true)}} >Saved</button>
         </div>
      }

        {
        state.Profile.loading ? <img className='d-block mx-auto my-4' style={{width:'100px'}} 
        src='https://i.gifer.com/ZZ5H.gif' alt = 'loading...' />
        : saveTab ? <Saved Auth = {Auth} dispatch = {dispatch} />
         :<Posts  Auth = {Auth} Profile = {Profile} id = {id} dispatch = {dispatch} />
        }
        
    </div>
    </>


        
}


export default Profile