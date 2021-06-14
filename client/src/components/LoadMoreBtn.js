import react from 'react'


function LoadMoreBtn({result,page,load,handleLoadMore}){
    return <>
     <div className = 'load_more'>
       {
            result < (page*(page-1)/2)*3 ? ''
           : !load && <button className = 'btn btn-dark d-block mx-auto load_more_btn' onClick = {handleLoadMore}>
             Load More
            </button>
       }
       </div>
    </>
}


export default LoadMoreBtn