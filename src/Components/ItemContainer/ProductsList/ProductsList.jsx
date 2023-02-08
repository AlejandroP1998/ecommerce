import { useUserContext } from '../../../Contexts/userContext';
import Loading from '../../Loading/Loading';
import './ProductsList.scss'
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

const ProductsList = ({ loading, data }) => {
    const { user } = useUserContext()

    const notify = () =>{
        setTimeout(() => {
            Swal.fire({
                icon: 'error',
                title: 'Inicia sesión para poder comprar',
                timer: '1000',
                showConfirmButton: false
            })
        }, 0)
    }

    return (
        <div>
            {loading
                ? <Loading />
                : <>
                    <div className="productsContainer">
                        {
                            user.logged === true ?
                                data.map(prod =>
                                    <Link to={'/products/details/' + prod.id} key={prod.id} className="prod">
                                        <h2>{prod.name}</h2>
                                        <br />
                                        <h3>{prod.description}</h3>
                                        <h3>{prod.oferta === 'true' && 'Gana cupones de descuento 🐯'}</h3>
                                        <p>{prod.stock > 0 && 'Disponible en tienda'}</p>
                                        <img src={prod.imageUrl} alt={prod.name} />
                                        {prod.oferta === 'true' && <h4>Producto premiado</h4>}
                                    </Link>
                                )
                                :
                                data.map(prod =>
                                    <Link to={'/'} key={prod.id} className="prod" onClick={notify}>
                                        <h2>{prod.name}</h2>
                                        <br />
                                        <h3>{prod.description}</h3>
                                        <h3>{prod.oferta === 'true' && 'Gana cupones de descuento 🐯'}</h3>
                                        <p>{prod.stock > 0 && 'Disponible en tienda'}</p>
                                        <img src={prod.imageUrl} alt={prod.name} />
                                        {prod.oferta === 'true' && <h4>Producto premiado</h4>}
                                    </Link>
                                )

                        }
                    </div>
                </>
            }

        </div>
    )
}

export default ProductsList;