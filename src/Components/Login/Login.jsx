import './Login.css'
import React from 'react'

function Login() {
  const [isContainerActive, setIsContainerActive] = React.useState(false)
  const signUpButton = () => {
    setIsContainerActive(false)
  }
  const signInButton = () => {
    setIsContainerActive(true)
  }

  return (
    <div className="loginContainer">
      <div
        className={`container${isContainerActive ? ' right-panel-active' : ''}`}
        id="container"
      >
        <div className="form-container sign-up-container">
          <form action="/addProduct" method="GET">
            <h1>Admin Login</h1>
            <button type="submit">Connect</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="/UserDashBoard" method="GET">
            <h1>User Login</h1>
            <button type="submit">Connect</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>User Login</h1>
              <p>hi there, let's vote now !!!!</p>
              <button className="ghost" id="signIn" onClick={signUpButton}>
                Click here
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Admin Login</h1>
              <p>Wonna know results, click here !!!</p>
              <button className="ghost" id="signUp" onClick={signInButton}>
                Click here
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
