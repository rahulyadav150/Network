import react, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../Avatar'
import moment from 'moment'
import Like from '../../Like'
import CommentMenu from './CommentMenu'
import { useSelector, useDispatch } from 'react-redux'
import { updateComment } from '../../../redux/Actions/commentAction'
import { commentLike, commentUnLike } from '../../../redux/Actions/commentAction'
import InputComment from './InputComment'

function CommentCard({children, comment, post,commentId}) {
  const [readMore, setReadMore] = useState(false)
  const [content, setContent] = useState('')
  const [isLike, setIsLike] = useState(false)
  const [onReply, setOnReply] = useState(false)
  const [loadLike, setLoadLike] = useState(false)
  const { Auth } = useSelector(state => state)
  const [onEdit, setOnEdit] = useState(false)
  const dispatch = useDispatch()


  useEffect(() => {
    setContent(comment.content)
    if (comment.likes.find((like) => like._id === Auth.user._id))
      setIsLike(true)
  }, [comment,Auth.user,dispatch])
  const styleCard = {
    opacity: comment._id ? 1 : 0.5
  }

  const handleLike = async () => {
    if (loadLike) return;
    setLoadLike(true)
    setIsLike(true)
    await dispatch(commentLike({ post, comment, Auth }))
    setLoadLike(false)
    }

  const handleUnLike = async () => {
    if (loadLike) return;
    setLoadLike(true)
    setIsLike(false)
    await dispatch(commentUnLike({ post, comment, Auth }))
    setLoadLike(false)
  }
  const handleUpadate = () => {
    if (comment.content !== content) {
      dispatch(updateComment({ comment, content, post, Auth }))
      setOnEdit(false)
    } else setOnEdit(false)
  }

  const handleReply = () => {
    if(onReply) return setOnReply(false)
    setOnReply({...comment,commentId})
  }
 
  return <>
    <div className='comment_card mt-2' >
      <Link to={`/profile/${comment.user._id}`} className='d-flex text-dark'>
        <Avatar src={comment.user.avatar} size='sm' />
        <h6 className='mx-1'>{comment.user.userName}</h6>
      </Link>
      <div className='comment_content' style={styleCard}>
        <div>
          { 
            onEdit ? <textarea className='textarea' rows='5' value={content} onChange={(e) => setContent(e.target.value)} />
              : <div>
               {
                 comment.tag && comment.tag._id !== comment.user._id  &&
                  <Link style ={{marginRight:'.25rem'}} to = {`/profile/${comment.tag._id}`}>
                   @{comment.tag.userName} 
                 </Link>
                 
               }
                <span >
                  {
                    content.length < 60 ? content :
                      readMore ? content + ' ' : content.slice(0, 60) + '.....'
                  }
                </span>
                {
                  content.length > 60 &&
                  <span className='readMore' onClick={() => setReadMore(!readMore)} >
                    {
                      readMore ? 'Show less' : 'Read more'
                    }
                  </span>
                }

              </div>
          }
          <div>
            <small className='text-muted mr-3' >
              {moment(comment.createdAt).fromNow()}
            </small>
            <small className='font-weight-bold mr-3' >
              {comment.likes.length} likes
            </small>
            <small className='font-weight-bold mr-3' onClick = {handleReply} >
              {onReply ? 'cancle' : 'reply'}
            </small>
            {
              onEdit ? <>
                <small className='font-weight-bold mr-3' onClick={handleUpadate}>
                  Update
                      </small>
                <small className='font-weight-bold mr-3' 
                onClick={() => {setContent(comment.content)
                                setOnEdit(false) }}>
                               Cancle
                </small>
              </>
                : ''
            }
          </div>
        </div>
        <div className='like d-flex align-items-center'>
          <CommentMenu post={post} comment={comment} Auth={Auth} setOnEdit={setOnEdit} />
          <Like isLike={isLike} handleLike={handleLike}
            handleUnLike={handleUnLike} style={{ cursor: 'pointer' }} />
        </div>
      </div>
      {
        onReply &&
        <InputComment post = {post} onReply = {onReply} setOnReply = {setOnReply}>
          <Link to = '/profile/${onReply.user._id}' className = 'mr-1' >
            @{onReply.user.userName}:
          </Link>
        </InputComment>
      }
    </div>
    {children}

  </>
}

export default CommentCard