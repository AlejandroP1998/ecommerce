import * as Yup from 'yup'
import { Formik } from 'formik';
import '../Session.scss'
import { FcGoogle } from 'react-icons/fc'
import { Link, Navigate } from 'react-router-dom';
import { useUserContext } from '../../../Contexts/userContext';
import Loading from '../../Loading/Loading'



const schema = Yup.object().shape({
    email: Yup.string().email('El email no es válido').required('Sin email no se puede ☹️'),
    password: Yup.string().min(3, 'Mínimo 3 caracteres').max(30, 'Máximo 30 caracteres').required('Si no te acuerdas prueba con Google 🤪')
})

const Login = () => {

    const { login, user, loading, googleLogin } = useUserContext()

    const log = (values) => {
        login(values)
    }

    if (user.logged === true) {
        
        return <Navigate to={'/'} />
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
                            log(values)
                        }}
                        validationSchema={schema}
                    >
                        {({
                            values, handleChange, handleSubmit, errors
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <label className='title'>Login</label>
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

                                <button className="fifth" type="submit">Ingresar usuario 😉</button>
                                <br />
                                <Link className='registerbtn' to={'/register'}>¿Aun no tienes una cuenta 😐?</Link>
                            </form>
                        )}
                    </Formik>
                    <div className='others'>
                        <button onClick={googleLogin}><FcGoogle /></button>
                    </div>
                </>}
        </div>
    )
}

export default Login;