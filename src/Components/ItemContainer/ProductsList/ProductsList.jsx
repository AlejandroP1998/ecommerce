import Loading from '../../Loading/Loading';
import './ProductsList.scss'
import { Link } from "react-router-dom";


const ProductsList = ({ loading, data }) => {

    return (
        <div>
            {loading
                ? <Loading />
                : <>
                    <div className="productsContainer">
                        {
                            data.length > 0 &&
                            data.map(prod =>
                                <Link to={'/products/details/' + prod.id} key={prod.id} className="prod">
                                    <h2>{prod.name}</h2>
                                    <br />
                                    <h3>{prod.description}</h3>
                                    <h3>{prod.oferta === 'true' && 'Precio - (15%): ' + prod.price * 0.85 || 'Precio: $' + prod.price}</h3>
                                    <p>{prod.stock > 0 && 'Disponible en tienda'}</p>
                                    <img src={prod.imageUrl} alt={prod.name} />
                                    {prod.oferta === 'true' && <h4>Producto en oferta</h4>}
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