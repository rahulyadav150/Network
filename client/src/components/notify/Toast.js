


function Toast(props) {

    return <>
        
        <div className={` alert alert-${props.status} alert-dismissible fade show text-centre`}
            style={{ width: '300px', position: 'fixed', top: '5px', right: '5px', zIndex: '50' }}>
            <strong>{props.msg} </strong>{props.info}
            <button onClick={props.handleShow} type="button" class="close" data-dismiss="alert">&times;</button>
        </div>
    </>
}
export default Toast;