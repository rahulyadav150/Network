import react, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkImage } from '../../utils/imageUpload'
import {updateProfileUser} from '../../redux/Actions/profileAction'


function EditProfile({ setOnEdit }) {

  const intistate = {
    fullName: '', mobile: '', website: '', address: '', gender: '', story: ''
  }
  const [updatedData, setUpdatedData] = useState(intistate);
  const { fullName, mobile, website, address, gender, story } = updatedData
  const [avatar, setAvatar] = useState('')
  const { Auth, Theme } = useSelector(state => state)
  const dispatch = useDispatch()

  const changeAvatar = (e) => {
    
    const file = e.target.files[0];
    const error = checkImage(file);
    if (error) return dispatch({ type: 'ALERT', payload: { err: error } })
    setAvatar(file);
  }

  const handleInput = (e) => {

    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value })
    console.log(e.target)
  }

  useEffect(() => {
    setUpdatedData(Auth.user)
  },[Auth.user])

  const handleSubmit =(e) =>{
    e.preventDefault();
    dispatch(updateProfileUser({updatedData,avatar,Auth}));
  }


  
  return <>
    <div className='edit_profile'>
      <button className='btn btn-danger btn_close'
        onClick={() => setOnEdit(false)}>
        Close
          </button>

      <form onSubmit={handleSubmit}>
        <div className='info_avatar'>

          <img src={avatar ? URL.createObjectURL(avatar) : Auth.user.avatar}
            alt='avatar' style={{ filter: Theme ? 'invert(1)' : 'invert(0)' }} />
          <span>
            <i className='fas fa-camera' />
            <p>Change</p>
            <input type='file' name='file' id='file_up'
              accept='image/*' onChange={changeAvatar} />
          </span>
        </div>
        <div className='form-group'>
          <div className='position-relative' >
            <label htmlFor='fullName'>Full name</label>
            <input type='text' id='fullName' className='form-control'
              name='fullName' value={fullName} onChange={handleInput} />
            <small className='position-absolute text-danger'
              style={{ top: '50%', right: '0', transform: 'translate(-30%,25%)' }}>
              {fullName.length}/25
            </small>
          </div>
        </div>

        <div className='form-group'>

          <label htmlFor='mobile'>Mobile</label>
          <input type='text' className='form-control'
            id='mobile' name='mobile' value={mobile} onChange={handleInput} />
        </div>

        <div className='form-group'>

          <label htmlFor='address'>Address</label>
          <input type='text' className='form-control'
            id='address' name='address' value={address} onChange={handleInput} />
        </div>

        <div className='form-group'>

          <label htmlFor='website'>Website</label>
          <input type='text' className='form-control'
            id='website' name='website' value={website} onChange={handleInput} />
        </div>


        <div className='form-group position-relative'>

          <label htmlFor='story'>Story</label>
          <textarea cols='30' rows='4' className='form-control'
            id='story' name='story' value={story} onChange={handleInput} />
          <small className='position-absolute text-danger'
            style={{ right: '0px' }}>
            {story.length}/200
            </small>
        </div>

        <label htmlFor='gender'>Gender</label>
        <select name='gender' id='gender' className='form-control' onChange={handleInput} value={gender}>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
          <option value='other'>Other</option>
        </select>

        <button className='btn btn-info w-100 mt-4' type='submit'>Save</button>


      </form>
    </div>

  </>
}

export default EditProfile;