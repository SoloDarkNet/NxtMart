import {useState} from 'react'
import Cookies from 'js-cookie'
import {Redirect, useHistory} from 'react-router-dom'

import './index.css'

const Login = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [type, setType] = useState('password')
  const [buttonOk, setButtonOk] = useState(false)
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const history = useHistory()

  const onHandleKeyup = e => {
    if (e !== null) {
      setButtonOk(prev => !prev)
    }
  }

  const onSubmitSuccess = jwtToken => {
    Cookies.get('jwt_token', jwtToken, {expires: 1})
    history.replace('/')
  }

  const onErrormessage = msg => {
    setShowSubmitError(true)
    setErrorMsg(msg)
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/login" />
  }

  const formLogo = () => (
    <div>
      <img
        src="https://res.cloudinary.com/dqfqwre2q/image/upload/v1713680287/Logo_2_ty0ilv.png"
        className="login-logo"
        alt="login website logo"
      />
    </div>
  )

  const username = () => (
    <div className="inputContainer">
      <label htmlFor="name">Username</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={e => setName(e.target.value)}
        onKeyUp={onHandleKeyup}
      />
    </div>
  )

  const inputPassword = () => (
    <div className="inputContainer">
      <label htmlFor="password">Password</label>
      <input
        type={type}
        id="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
    </div>
  )

  const onHandleCheckbox = () => {
    setType(prevState => (prevState === 'password' ? 'text' : 'password'))
  }

  const showPassword = () => (
    <div className="showPasswordContainer">
      <input
        type="checkbox"
        id="showPassword"
        checked={type === 'text'}
        onChange={onHandleCheckbox}
      />
      <p htmlFor="showPassword">Show Password</p>
    </div>
  )

  const onSubmitForm = async event => {
    event.preventDefault()
    const userDetails = {name, password}
    console.log(userDetails)
    const api = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(api, options)
    const data = await response.json()

    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
      console.log(data.jwt_token)
    } else {
      onErrormessage(data.error_msg)
    }
  }

  return (
    <div className="login-container">
      <form className="form-container" onSubmit={onSubmitForm}>
        <div className="formLogo">{formLogo()}</div>
        <div className="totalInputs">
          <div>
            {username()}
            {inputPassword()}
            {showPassword()}
          </div>
          <button
            type="submit"
            className={`login-button ${buttonOk ? 'button2' : ''}`}
          >
            Login
          </button>
        </div>
        {showSubmitError && <p style={{color: 'red'}}>{errorMsg}</p>}
      </form>
    </div>
  )
}
export default Login
