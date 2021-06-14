
import CardBody from './post_card/CardBody'
import CardFooter from './post_card/CardFooter'
import CardHeader from  './post_card/CardHeader'

import InputComment from './home/comments/InputComment'
import Comments from './home/Comments'


function PostCard({post}){
    return <>
           <div className = 'card' >
               <CardHeader post ={post} />
               <CardBody post ={post} />
               <CardFooter post ={post} />

               <Comments post = {post} />
               <InputComment post = {post} />
               

            </div>
    </>
}
export default PostCard