import { Formik } from "formik";
import Swal from "sweetalert2";
import icono from '../../Assets/toast.png'
import logo from '../../Assets/logo.png'
import './Footer.scss'


const Footer = () => {
    return (
        <div className="footerContainer">
            <div>
                <Formik
                    initialValues={{
                        email: '',
                        order: ''
                    }}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address'
                        }
                        return errors;
                    }}
                    onSubmit={(values) => {
                        Swal.fire({
                            position: 'top-end',
                            background: "#00092C",
                            color: "white",
                            iconHtml: `<img src=${icono} class="icono">`,
                            title: 'Alguien se pondra en contacto pronto\n\nEmail: '+values.email+
                                '\n\nCodigo de orden: '+values.order,
                            showConfirmButton: false,
                            toast: true,
                            timer: 2600
                        })
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting
                    }) => (
                        <form id="miForm" className="form" onSubmit={handleSubmit}>
                            <label>¿Tuviste algun problema con una orden?</label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                placeholder="Ingresa tu direccion de email"
                            />
                            {errors.email && touched.email && errors.email}
                            <input
                                type="text"
                                name="order"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.order}
                                placeholder="Ingresa tu codigo de orden"
                            />
                            <button type="submit" >
                                Submit
                            </button>
                        </form>
                    )}
                </Formik>
            </div>
            <div className="logo">
                <img src={logo} alt="Logotipo" />
            </div>
        </div>
    )
}

export default Footer;