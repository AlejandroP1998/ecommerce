import { useParams } from "react-router-dom";
import callCollection from "../../../../Hooks/callCollection";
import { where, documentId } from "firebase/firestore";
import './DetailContainer.scss'
import Swal from "sweetalert2";
import icono from '../../../../Assets/toast.png'
import Loading from "../../../Loading/Loading";
import ItemCount from "./ItemCount/ItemCount";
import { useState } from "react";
import { useCartContext } from "../../../../Contexts/CartContext";
import { Link } from "react-router-dom";

const DetailContainer = () => {

    const { prodId } = useParams()
    const [cantidad, setCantidad] = useState(1)

    const { AgregarAlCarrito, isInCart } = useCartContext()

    const { data, loading } = callCollection(
        'localStore',
        [prodId],
        prodId && [
            where(documentId(), "==", prodId)
        ]
    )

    

    const notify = () => {
        Swal.fire({
            position: 'top-end',
            background: "#00092C",
            color: "white",
            iconHtml: `<img src=${icono} class="icono">`,
            title: 'Producto añadido al carrito',
            showConfirmButton: false,
            toast: true,
            timer: 600
        })
    }

    const handleAgregar = () => {
        
        const elemento = {
            ...data,
            id: prodId,
            cantidad: cantidad
        }
        console.log(typeof(elemento));
        AgregarAlCarrito(elemento)
    }

    return (
        <div>
            {
                loading ? <Loading />
                    : data && data.map(prod => <div key={documentId()} className="detailContainer">
                        <div className="prodContainer">
                            <div className="info">
                                <h2>{prod.name}</h2>
                                <h3>{prod.description}</h3>
                                {prod.oferta === 'true' && <p>Precio Anterior: ${prod.price} USD</p>}
                                {prod.oferta === 'true' && <p>Precio de Oferta <br /> (15% de descuento): ${prod.price * 0.85} USD</p>}
                                {prod.oferta === 'false' && <p>Precio: ${prod.price} USD</p>}
                                {prod.stock > 1 && <p>Cantidad en stock: {prod.stock} unidades</p>}
                                {prod.stock === 1 && <p>Cantidad en stock: {prod.stock} unidad</p>}
                                {!isInCart(prodId) ?
                                    <ItemCount max={prod.stock} setCantidad={setCantidad} cantidad={cantidad} onAdd={handleAgregar} /> 
                                    : <Link to={'/cart'} className="fifth">Terminar compra</Link>}
                            </div>
                            <div className="image">
                                <img src={prod.imageUrl} alt={prod.name} />
                            </div>
                        </div>
                    </div>)
            }

        </div>
    )
}

export default DetailContainer;