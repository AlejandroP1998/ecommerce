import { Link } from 'react-router-dom'
import logo from '../../Assets/logo.png'
import './NavBar.scss'
import { BiUserCircle } from 'react-icons/bi'
import {MdShoppingCart} from 'react-icons/md'
import {MdExitToApp} from 'react-icons/md'
import 'animate.css'
import { useUserContext } from '../../Contexts/userContext'


const NavBar = () => {

    const {user, logout} = useUserContext()

    return (
        <div>
            <div className='infoNav'>
                {user.logged === false && <Link to={'/login'}><BiUserCircle className='icons'/></Link>}
                {user.logged === true && <Link onClick={logout} to={'/clear'}><MdExitToApp className='icons'/></Link>}
                <Link to={'/'}><img src={logo} alt="Logotipo" className='logo' /></Link>
                <Link to={'/cart'}><MdShoppingCart className='icons'/></Link>
            </div>
            <nav className='navContainer'>
                <Link to={'/products/guitar'} className='navLinks'>Guitarras/Bajos</Link>
                <Link to={'/products/drum'} className='navLinks'>Percusión</Link>
                <Link to={'/products/piano'} className='navLinks'>Pianos/Teclados</Link>
                <Link to={'/products/stereo'} className='navLinks'>Amplificadores</Link>
                <Link to={'/products/ofertas'} className='navLinks'>Ofertas</Link>
            </nav>
        </div>
    )
}

export default NavBar;