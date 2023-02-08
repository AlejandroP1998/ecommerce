import { useCallback } from "react"
import '../DetailContainer.scss'

const ItemCount = ({ max, setCantidad, cantidad, onAdd }) => {

    const handleRestar = useCallback(() => {
        cantidad > 1 && setCantidad(cantidad - 1)
    }
    )

    const handleSumar = () => {
        cantidad < max && setCantidad(cantidad + 1)
    }


    return (
        <div className="itemCount">
            <div className="cantidad">
                <button
                    disabled={cantidad === max}
                    className={cantidad === max ? 'c2' : 'c1'}
                    onClick={handleSumar}
                >+</button>

                <span>{cantidad}</span>

                <button
                    disabled={cantidad === 1}
                    className={`${cantidad > 1 ? 'c1' : 'c2'}`}
                    onClick={handleRestar}
                >-</button>
                <br />

                <button className='fifth btnSesion' onClick={onAdd}>Agregar al carrito 🛒</button>

            </div>



        </div>
    )
}

export default ItemCount