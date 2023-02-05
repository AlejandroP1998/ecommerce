import { Navigate } from "react-router-dom";
import { useCartContext } from "../../../Contexts/CartContext";
import '../../SesionAccess/Session.scss'

const ClearCart = () => {

    const { emptyCart, cart } = useCartContext()
    
    /* if(cart.length === 0){
        return <Navigate to='/login' />
    } */
    console.log(cart);

    return (
        <div className="loginContainer">
            <div className="block">
                <h2>¿Salir de la sesión?</h2>
                <p>Al momento de salir de la sesión, si no ha generado la orden los items que pudo haber añadido al carrito se perderan y tendra que añadirlos nuevamente al iniciar sesión</p>
                <button className="fifth" onClick={emptyCart}>Salir de la sesión 🥲</button>
            </div>
        </div>)
}

export default ClearCart;