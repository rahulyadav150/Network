
import {useSelector} from 'react-redux'
function Carousel({post}){
    const {Theme} = useSelector(state=>state) 
    function isActive(index){
       if(index===0)
       return 'active'
   }
  
    return <>
        <div id= {`image${post._id}`} className="carousel slide" data-ride="carousel">
            
             <ol className="carousel-indicators">
                {
                      post.images.map((image,index)=>(
                        <li  key = {index} data-target={`#image${post._id}`} 
                        data-slide-to={index} className = {isActive(index)} />
                      ))
                }

             </ol>

            <div className="carousel-inner">
                {
                    post.images.map((image,index)=>(
                        <div key = {index} className={`carousel-item ${isActive(index)}`}>
                            <img src={image.url} className="d-block w-100 " alt="..." style = {{filter : Theme ? 'invert(1)': 'invert(0)'}} />
                        </div>
                    ))
                }
                    
            </div>

            <a className="carousel-control-prev" href={`#image${post._id}`} role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href={`#image${post._id}`}  role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
            </>
}

export default  Carousel 