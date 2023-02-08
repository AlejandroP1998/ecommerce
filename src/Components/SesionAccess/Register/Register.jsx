import * as Yup from 'yup'
import { Formik } from 'formik';
import { Link, Navigate } from 'react-router-dom';
import { useUserContext } from '../../../Contexts/userContext'
import Loading from '../../Loading/Loading'
import '../Session.scss'
import Swal from 'sweetalert2';

const schema = Yup.object().shape({
    email: Yup.string().email('El email no es válido').required('Sin email bueno no se puede ☹️'),
    password: Yup.string().min(3, 'Mínimo 3 caracteres').max(30, 'Máximo 30 caracteres').required('Mas de 3 caracteres porfa 🤪')
})

const Register = () => {

    const { register, user, loading } = useUserContext()

    if (user.logged === true) {
        return <Navigate to={'/'} />
    }

    const regist = (values) => {
        register(values)
        setTimeout(() => {
            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                timer: '2000',
                showConfirmButton: false
            })
        }, 0)
    }

    return (
        <div className='loginContainer'>
            {loading ? <Loading />
                : <>
                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        onSubmit={(values) => {
                            regist(values)
                        }}
                        validationSchema={schema}
                    >
                        {({
                            values, handleChange, handleSubmit, errors
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <label className='title'>Registro</label>
                                <input
                                    className="form-control my-2"
                                    onChange={handleChange}
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    placeholder="Ingresa tu email (No te olvides de la @)"
                                />
                                {errors.email && <p>{errors.email}</p>}

                                <input
                                    className="form-control my-2"
                                    onChange={handleChange}
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    placeholder="Ingresa tu contraseña"
                                />
                                {errors.password && <p>{errors.password}</p>}

                                <button className="fifth" type="submit">Registrar usuario 😉</button>
                                <br />
                                <Link className='registerbtn' to={'/login'}>¿Ya tienes una cuenta 😐?</Link>
                            </form>
                        )}
                    </Formik>
                </>}
        </div>
    )
}

export default Register;