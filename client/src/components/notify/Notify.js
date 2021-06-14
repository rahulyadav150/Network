
import Loading from './Loading';
import { useSelector, useDispatch } from 'react-redux'
import Toast from './Toast';
function Notify() {
   const { Alert } = useSelector(state => state);
   const dispatch = useDispatch();
   function handleShow() {
      return dispatch({ type:'ALERT', payload: {} })

   }

   return (<>
      {Alert.loading && <Loading />}
      {Alert.success && <Toast status='success' msg='Success!' info={Alert.success} handleShow={handleShow} />}
      {Alert.err && <Toast status='danger' msg='Error!' info={Alert.err} handleShow={handleShow} />}
   </>
   )
}
export default Notify;