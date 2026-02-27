import Cookies from 'js-cookie'
import {useHistory, Link, withRouter} from 'react-router-dom'
import {CiLogout} from 'react-icons/ci'
import './index.css'

const Header = () => {
  const history = useHistory()
  const OnLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/')
  }

  return (
    <nav className="nav-header">
      <div className="header-container">
        <div>
          <Link to="/">
            <img
              className="website-logo"
              src="https://res.cloudinary.com/dqfqwre2q/image/upload/v1713680287/Logo_2_ty0ilv.png"
              alt="website logo"
            />
          </Link>
        </div>
        <div className="nav-link">
          <Link to="/" className="nav-item">
            Home
          </Link>
          <Link to="/cart" className="nav-item">
            Cart
          </Link>
          <Link to="/login">
            <button type="submit" onClick={OnLogout}>
              <CiLogout /> Logout
            </button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
