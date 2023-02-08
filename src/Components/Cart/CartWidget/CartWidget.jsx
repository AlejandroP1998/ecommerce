import { Link } from "react-router-dom";
import { MdShoppingCart } from 'react-icons/md'
import '../../NavBar/NavBar.scss'
import { useCartContext } from "../../../Contexts/CartContext";

const CartWidget = () => {

    const { totalCantidad, cart } = useCartContext()

    return (
        <Link to='/cart' className="icons2">
            <MdShoppingCart />
            {cart.length > 0 && <span>{totalCantidad()}</span>}
        </Link>
    )
}

export default CartWidget;