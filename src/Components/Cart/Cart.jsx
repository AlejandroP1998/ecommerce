import { useCartContext } from "../../Contexts/CartContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import './Cart.scss'
import Swal from "sweetalert2";
import { BsTrashFill } from 'react-icons/bs'

const Cart = () => {

    const { cart, emptyCart, totalCart, removerItem } = useCartContext()


    if (cart.length === 0) {

        setTimeout(() => {
            Swal.fire({
                icon: 'error',
                title: 'Oops... no tienes elementos en el carrito',
                timer: '2000',
                showConfirmButton: false
            })
        }, 0)

        return <div className="bloque">
            <Navigate to='/' />
        </div>
    }

    const navegar = useNavigate();

    return (
        <div className="cartContainer">
            <div className="block">
                <h1>Carrito de compras</h1>
                {
                    cart.map((prod) => (
                        <div className="sections" key={prod.id}>
                            <div>
                                <button onClick={() => removerItem(prod.id)}><BsTrashFill /></button>
                            </div>
                            <div className="info">
                                <h2>{prod.name}</h2>
                                <h3>{prod.description}</h3>
                                {prod.oferta === 'true' && <p>Producto en oferta</p>}
                                {prod.oferta === 'true' && <p>Adquiriras un cupon de descuento para vuestra proxima compra 😉</p>}
                                <p>Precio: ${prod.price} USD</p>
                                <p>Cantidad: {prod.cantidad}</p>
                            </div>
                            <div>
                                <img src={prod.imageUrl} alt={prod.name} />
                            </div>

                        </div>

                    ))
                }
            </div>
            <div className="toCheckout">
                <button className="fifth" onClick={emptyCart}>🤯 Vaciar carrito 🤯</button>
                <div>
                    <h4>Total de la compra ${totalCart()}</h4>
                    <Link className="check" to="/checkout">😻 Generar orden de pago 💸</Link>
                </div>
                <button className="fifth" onClick={() => navegar(-1)}>⬅️ Volver</button>
            </div>


        </div>
    )
}

export default Cart;