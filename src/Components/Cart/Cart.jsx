import { useCartContext } from "../../Contexts/CartContext";
import { Link, Navigate, useParams } from "react-router-dom";
import './Cart.scss'
import Swal from "sweetalert2";


const Cart = () => {

    const { cart, emptyCart, totalCart } = useCartContext()


    if (cart.length === 0) {

        setTimeout(() => {
            Swal.fire({
                icon: 'error',
                title: 'Oops... no tienes elementos en el carrito',
                timer: '3000',
                showConfirmButton: false
            })
        }, 2000)

        return <div className="bloque">
            <Navigate to='/' />
        </div>
    }

    console.log('Carrito: '+typeof(cart));

    const carrito = []

    for(let i = 0; i<cart.length; i++){
        carrito.push(cart[i][0])
    }

    return (
        <div className="cartContainer">
            <div className="block">
                {
                    carrito.map((prod) => (
                        <div key={prod.id}>
                            <h2>Nombre: {prod.name}</h2>
                            <p>{prod.description}</p>
                            <p>Categoria: {prod.category}</p>
                            <p>Precio: {prod.price}</p>
                            {prod.oferta === 'true' && <p>Oferta</p>}
                            <hr />
                        </div>
                    ))
                }
                <h4>Total de la compra ${totalCart()}</h4>
            </div>


            <button className="btn btn-danger" onClick={emptyCart}>Vaciar carrito</button>
            <Link className="btn btn-success mx-2" to="/checkout">Generar orden de pago</Link>

        </div>
    )
}

export default Cart;