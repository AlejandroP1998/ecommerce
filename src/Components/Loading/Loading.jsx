import ReactLoading from 'react-loading'
import './Loading.scss'


const Loading = () => {

    return (
        <div className='containerLoading'>
            <div className='loading'>
                <h2>Cargando</h2>
                <ReactLoading type={'bars'} color="red" />
            </div>
        </div>
    )
}

export default Loading;