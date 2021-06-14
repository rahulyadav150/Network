import react, { useState } from 'react'
import Carousel from '../Carousel'


function CardBody({ post }) {
    const [readMore,setreadMore] = useState(false)
    return <>
        <div className='card_body'>
            <div className='card_body_content'>
                {
                    post.content.length<60 ? post.content : 
                    readMore ? post.content+ '  ' :
                    post.content.slice(0,60) +  '......'
                }
                <span className = 'read_more' onClick = {()=>setreadMore(!readMore)}>
                {
                    post.content.length>60 ? readMore ? 'show less' : 'Read more'
                    : ' '
                }
            </span>
            </div>
            
            {
                post.images.length>0 && <Carousel post = {post} />
            }
           
        </div>
    </>
}
export  default CardBody;