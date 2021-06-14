import  { useState,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Types } from '../redux/Actions/globalTypes'
import {createPost,updatePost} from '../redux/Actions/postAction'

function StatusModal() {
    const dispatch = useDispatch()
    const { Auth,Theme,Status } = useSelector(state => state)
    const [content, setContent] = useState('');
    const [images,setImages] = useState([])
  
    const handleChangeImages = e => {
        const files = [...e.target.files]
        let err=''
        let newImages = []

        files.forEach(file=>{
            if(file.type !== 'image/jpeg' && file.type!=='image/png')
            return err='file format is incorrect'

            return newImages.push(file)
         })

        if(err) dispatch({type:Types.Alert,payload:{err:err}})
        setImages([...images,...newImages])

    }
    const removeImages = (index) =>{
        const newArr = [...images]
         
        newArr.splice(index,1)
        console.log(images)
        setImages(newArr);
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(images.length===0)
        return dispatch({type:Types.Alert,payload:{err:'Please add an image'}})

        if(Status.onEdit){
        dispatch(updatePost(images,content,Auth,Status))
        }
        else
        dispatch(createPost(images,content,Auth))

        setContent('')
        setImages([])
        dispatch(({type:Types.Status,payload:false}))
      }

      useEffect(()=>{
          if(Status.onEdit){
              setImages(Status.images)
              setContent(Status.content)
            
          }

      },[Status])

    return <>

        <div className='status_modal' >
            <form onSubmit = {handleSubmit}>
                <div className='status_header'>
                    <h5>Create Post</h5>
                    <span
                        onClick={() => dispatch({ type: Types.Status, payload: false })}>
                        &times;
                    </span>
                </div>
                <div className='status_body'>
                    <textarea className='content' cols='30' rows='4' value={content} onChange={(e) => setContent(e.target.value)}
                        placeholder={`${Auth.user.userName}, what are you thinkng ?`} />
                        <div className = 'show_images'>
                           { images.map((image,index)=>(
                               <div className = 'file_image' key={index}  >
                                <img src={
                                    image.url ? image.url :
                                    URL.createObjectURL(image)} 
                                    alt = 'uploadImages'
                                className='image'
                                style={{filter: Theme?'invert(1)':'invert(0)'}} />
                                 <span  className='removeImage'  onClick = {()=>removeImages(index)}>&times;</span>
                              </div>                            
                            ))
                            }
                        </div>
                    <div className='input_images'>
                        <i className='fas fa-camera' />
                        <div className='file_upload'>
                            <i className='fas fa-image' />
                            <input type='file' id='file' multiple accept='image/*' onChange = {handleChangeImages} />
                       
                        </div>


                    </div>

                </div>
                <div className = 'status_footer'>
                    <button className = 'btn btn-secondary'>Post</button>
                </div>
            </form>
        </div>
    </>
}

export default StatusModal;