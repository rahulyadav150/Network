import react,{useState,useEffect} from 'react'
import {useDispatch,useSelector}  from 'react-redux'
import PostThumb from '../components/PostThumb'
import {getDiscoverPosts} from '../redux/Actions/discoverAction'
import LoadMoreBtn from '../components/LoadMoreBtn'
import discoverReducer from '../redux/reducers/discoverReducer'
import {getDataAPI} from '../utils/fetchdata'
import {discoverTypes} from '../redux/Actions/discoverAction'

 


function Discover(){
   
    const {Auth,Discover,Profile} = useSelector(state=>state)
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)


    useEffect(()=>{
        if(!Discover.firstLoad)
        dispatch(getDiscoverPosts(Auth.token))
    },[Auth.token,dispatch,Discover.firstLoad,Profile.user])
    
    const handleLoadMore = async () => {
        setLoad(true)
        const res = await getDataAPI(`post_discover?limit=${Discover.page*3}&page=${Discover.page}`,Auth.token)
        console.log(res)
        dispatch({type : discoverTypes.updatePost,payload:res.data})
        setLoad(false)

    }

    return <>
    <div>
        {
             Discover.loading ? 
            <img className='d-block mx-auto my-4' style={{width:'100px'}} 
             src='https://i.gifer.com/ZZ5H.gif' alt = 'loading...' />
             : <PostThumb posts = {Discover.posts} result = {Discover.result} />
        }
        {
            load && <img className='d-block mx-auto my-4' style={{width:'100px'}} 
             src='https://i.gifer.com/ZZ5H.gif' alt = 'loading...' />
        }
        {   !Discover.loading &&
            <LoadMoreBtn result = {Discover.result} page = {Discover.page}  load ={load} handleLoadMore = {handleLoadMore}/>
        }

        
    </div>
    </>
}
export default Discover