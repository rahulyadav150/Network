import react from 'react'
import Avatar from '../Avatar'
import { Link,useHistory } from 'react-router-dom'
import moment from 'moment'
import { useSelector ,useDispatch} from 'react-redux'
import { Types } from '../../redux/Actions/globalTypes'
import {deletePost} from '../../redux/Actions/postAction'
import {BASE_URL} from '../../utils/config'


function CardHeader({ post }) {

 const { Auth } = useSelector(state => state)
 const dispatch = useDispatch()
 const history = useHistory()


 const handleEditPost = ()=>{
     dispatch({type:Types.Status,payload:{...post,onEdit:true}})
     

 }
 const handleCopyLink = () =>{
     navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`)
 }
 const handleDeletePost = () =>{
    if(window.confirm("Are you sure you want to delete this post ?")){
         dispatch(deletePost({post,Auth}))
         return  history.push('/')
    }
 }
    return <>
        <div className='card_header'>
            <div className='d-flex'>
                <Avatar src={post.user.avatar} size='lg' />
                <div className='card_name'>
                    <h6 className='m-0'>
                        <Link to={`/profile/${post.user._id}`} style={{ color: '#343a40' }}>
                            {post.user.userName}
                        </Link>
                    </h6>
                    <small className='text-muted'>
                        {moment(post.createdAt).fromNow()}
                    </small>
                </div>
            </div>

            <div className='nav-item dropdown'>
                <span className='material-icons' id='moreLink' data-toggle='dropdown'>
                    more_horiz
                </span>
                <div className='dropdown-menu' >
                    {
                        Auth.user._id === post.user._id &&
                        <>
                            <div className='dropdown-item' onClick = {()=>handleEditPost()}>
                                <span className='material-icons'  >create</span> Edit Post
                            </div>
                            <div className='dropdown-item' onClick = {handleDeletePost} >
                                <span className='material-icons' >delete_outline</span> Remove Post
                            </div>
                        </>

                    }
                    <div className='dropdown-item' onClick = {handleCopyLink}>
                        <span className='material-icons' >content_copy</span> Copy Link
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default CardHeader;