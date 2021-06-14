import react from 'react'
import {useDispatch} from 'react-redux'
import {deleteComment} from '../../../redux/Actions/commentAction'


function CommentMenu({ post, comment, Auth,setOnEdit}) {
    const dispatch = useDispatch()

    const handleRemove = () => {
        dispatch(deleteComment({post,comment,Auth}))
    }
    
    function menuItem() {
        return (<>
            <div className='dropdown-item' onClick = {() => setOnEdit(true)}>
                <span className='material-icons' >create</span> Edit
            </div>
            <div className='dropdown-item'>
                <span className='material-icons' onClick = {handleRemove} >delete_outline</span> Remove
            </div>
        </>
        )
    }

    return <>
        <div className='comment_menu'>
            <div className='nav-item dropdown'>
                <span className='material-icons' id='moreLink' data-toggle='dropdown' style={{ cursor: 'pointer' }}>
                    more_vert
                </span>
                {
                    post.user._id === Auth.user._id || comment.user._id === Auth.user._id ?
                        <div className='dropdown-menu' aria-labelledby='moreLink' style={{ cursor: 'pointer' }}>
                            {
                                post.user._id === Auth.user._id ?
                                    comment.user._id === Auth.user._id ?
                                        menuItem() :
                                        <div className='dropdown-item'>
                                            <span className='material-icons'  onClick = {handleRemove}>
                                                delete_outline
                                            </span> Remove
                                        </div>
                                    : comment.user._id === Auth.user._id && menuItem()
                            }
                        </div>
                        : ''
                }



            </div>
        </div>
    </>
}

export default CommentMenu
