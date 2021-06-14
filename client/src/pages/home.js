import react from 'react'
import Post from '../components/home/Posts'
import RightSideBar from '../components/home/RightsideBar'
import Status from '../components/home/Status'
import { useSelector } from 'react-redux'


function Home() {
    const { HomePosts } = useSelector(state => state)
    const loadImg = 'https://i.gifer.com/ZZ5H.gif'

    return <>
        <div className='home row mx-0' style = {{paddingBottom:'55px'}}>
            <div className='col-md-8 home_container'>
                <Status />
                {
                    HomePosts.loading ?
                        <img className='d-block '
                            style={{ width: '30%', height: '30%', margin: 'auto', objectFit: 'contain' }}
                            src={loadImg} alt='avatar' 
                            
                        />  : HomePosts.result === 0 ?
                               <h3 className='text-center text-danger'>No Posts</h3>
                                 : <Post />
                }

            </div>
            <div className='col-md-4' >
                <RightSideBar />
            </div>
          </div>

    </>
}

export default Home;