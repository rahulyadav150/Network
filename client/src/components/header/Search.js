
import  { useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDataAPI } from '../../utils/fetchdata'
import UserCard from '../UserCard';



function Search() {
   
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [load, setLoad] = useState(false);
    const { Auth } = useSelector(state => state);
    const dispatch = useDispatch();
    const loadImg = 'https://i.gifer.com/ZZ5H.gif'

    function handleClose() {
        setSearch('');
        setUsers([]);

    }
    async function handleSearch(e) {
        e.preventDefault();
        try {

            if (search && Auth.token) {
                setLoad(true)
                const res = await getDataAPI(`search?username=${search}`, Auth.token)
                setUsers(res.data)
                setLoad(false)
            }
            else {
                setUsers([])
            }

        } catch (err) {
            setLoad(false)
            dispatch({ type: 'ALERT', payload: { err: err.response.data.msg } })
        }

    }

    return <>
        <form onSubmit={handleSearch} className='search_form'>
            <input type='text' name='search' id='search' value={search}
                onChange={e => setSearch(e.target.value)} />

            <div className='search_icon' style={{ opacity: search ? '0' : '0.3' }}>
                <span className='material-icons'>search</span>
                <span >search</span>
            </div>

            <div className="close_search " onClick={handleClose}
                style={{ opacity: users.length === 0 ? 0 : 1 }}>&times;
            </div>
            {load && <img className='loadImg' src={loadImg} alt = 'loading....'/>}
            <div className='users'>
                {
                    search && users.map(user => (
                        <UserCard
                            key={user._id}
                            user={user}
                            border='border'
                            handleClose={handleClose}
                        />

                    ))}

            </div>

        </form>





    </>
}

export default Search;