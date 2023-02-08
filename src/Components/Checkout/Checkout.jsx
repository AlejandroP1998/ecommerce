import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useCartContext } from '../../Contexts/CartContext'
import { db } from "../../Firebase/config";
import { collection, addDoc, writeBatch, getDocs, query, where, documentId } from "firebase/firestore";
import { Formik } from "formik";
import * as Yup from 'yup'
import './Checkout.scss'
import Swal from "sweetalert2";

const schema = Yup.object().shape({
    nombre: Yup.string().min(4, 'Mínimo 4 caracteres').max(30, 'Máximo 30 caracteres').required('Este campo es requerido'),
    direccion: Yup.string().min(8, 'Mínimo 8 caracteres').max(40, 'Máximo 40 caracteres').required('Este campo es requerido'),
    email: Yup.string().email('El email no es válido').required('Este campo es obligatorio')
})


const Checkout = () => {

    const { cart, totalCart, setCart } = useCartContext()
    const { out } = useParams()

    console.log(cart);

    if (out === 'out') {
        setCart([])
        setTimeout(() => {
            Swal.fire({
                icon: 'info',
                title: 'Has salido de la sesión',
                timer: '2000',
                showConfirmButton: false
            })
        }, 0)
        return <Navigate to='/' />
    }

    const [orderId, setOrderId] = useState(null)

    const createOrder = async (values) => {

        const compra = []

        cart.forEach(prod => {
            compra.push({
                id_producto: prod.id,
                nombre: prod.name,
                cantidad: prod.cantidad
            })
        })

        const orden = {
            cliente: values,
            items: compra,
            total: totalCart()
        }

        const batch = writeBatch(db)
        const ordersRef = collection(db, 'orders')
        const productosRef = collection(db, 'localStore')

        const outOfStock = []

        const itemsRef = query(productosRef, where(documentId(), 'in', cart.map(prod => prod.id)))

        const productos = await getDocs(itemsRef)

        productos.docs.forEach(doc => {
            const item = cart.find(item => item.id === doc.id)

            if (doc.data().stock >= item.cantidad) {
                batch.update(doc.ref, {
                    stock: doc.data().stock - item.cantidad
                })
            } else {
                outOfStock.push(item)
            }
        })

        if (outOfStock.length === 0) {
            batch.commit()
                .then(() => {
                    addDoc(ordersRef, orden)
                        .then((doc) => {
                            setOrderId(doc.id)
                            setCart([])
                        })
                        .catch((error) => {
                            setTimeout(() => {
                                Swal.fire({
                                    icon: 'error',
                                    title: error,
                                    timer: '2000',
                                    showConfirmButton: false
                                })
                            }, 0)
                        })
                })
        } else {
            setTimeout(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops... algunos items no estan en stock',
                    timer: '2000',
                    showConfirmButton: false
                })
            }, 0)
        }

    }


    if (orderId) {
        setTimeout(() => {
            Swal.fire({
                icon: 'success',
                title: 'Tu compra ha sido exitosa',
                timer: '2000',
                showConfirmButton: false
            })
        }, 0)
        return <Navigate to='/' />
    }

    if (cart.length === 0) {
        return <Navigate to="/" />
    }

    return (
        <div className="container">

            <Formik
                initialValues={{
                    nombre: '',
                    direccion: '',
                    email: ''
                }}
                onSubmit={(values) => {
                    createOrder(values)
                }}
                validationSchema={schema}
            >
                {({
                    values, handleChange, handleSubmit, errors
                }) => (
                    <form onSubmit={handleSubmit} className="form">
                        <label>Generacion de orden</label>
                        <hr />
                        <input
                            className="form-control my-2"
                            onChange={handleChange}
                            type="text"
                            name="nombre"
                            value={values.nombre}
                            placeholder="Tu nombre"
                        />
                        {errors.nombre && <p>{errors.nombre}</p>}

                        <input
                            className="form-control my-2"
                            onChange={handleChange}
                            type="text"
                            name="direccion"
                            value={values.direccion}
                            placeholder="Tu dirección"
                        />
                        {errors.direccion && <p>{errors.direccion}</p>}

                        <input
                            className="form-control my-2"
                            onChange={handleChange}
                            type="email"
                            name="email"
                            value={values.email}
                            placeholder="Tu email"
                        />
                        {errors.email && <p>{errors.email}</p>}

                        <button className="btn btn-primary" type="submit">Enviar</button>
                    </form>
                )}
            </Formik>

        </div>
    )
}

export default Checkout