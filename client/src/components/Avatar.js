
import {useSelector} from 'react-redux';

function Avatar({src,size}){
    const {Theme} = useSelector(state=>state);
return (
<img src={src} className={`${size}-avatar`} alt ='avatar' style={{filter:Theme ? 'invert(1)':'invert(0)'}} />)
}
export default Avatar;