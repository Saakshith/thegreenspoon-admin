import React, {useState} from 'react'
import "./login.css"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import logoDark from "../green_spoon_logo.png"


const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const {dispatch} = useContext(AuthContext)
  
  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({type: "LOGIN", payload: user})
        navigate("/menu")
      })
      .catch((err) => {
        setError(true)
      })
  }

  return (
    <div className="login"> 
        <div className="logo-container">
          <img src={logoDark}  className="logo-img"/>
          <div className="logo-text">
              <h2 className="logo-header" >The Green Spoon</h2>
              <p className="logo-description" >Meatless Foods • Meaty Flavors</p>
          </div>
        </div>
        <form action="" className='login-form' onSubmit={handleLogin}>
            <div className="login-form-field-container">
                <label htmlFor="">Email</label>
                <input className="login-form-field" type="email" name="" id="" placeholder="example123@example.com" onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="login-form-field-container">
                <label htmlFor="">Password</label>
                <input className="login-form-field" type="password" name="" id="" placeholder='Password' onChange={e => setPassword(e.target.value)}/>
            </div>
            <button className='login-form-submit' type="submit">Log In</button>
            {error && <span className='error-message'>Wrong Email or Password</span>}
            <p></p>
            <p id="title">For Demonstration Purposes</p>
            <p>Email: greenspoonservices@gmail.com</p>
            <p>Password: thegreenspoon</p>
        </form>
    </div>
  )
}

export default Login