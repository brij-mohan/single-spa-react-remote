import { Link } from 'react-router-dom';
const Header = () =>  {
 return (
    <div className='navbar'>
    <nav>
           <Link className="nav-link" to="/react"> Show User </Link>
           <Link className="nav-link" to="/react/create-user"> Create User </Link>
    </nav>
    </div>
 )
}

export default Header;
