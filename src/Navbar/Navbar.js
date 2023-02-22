import React, {useRef} from 'react'
import {Link} from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import "./navbar.css"
import { FaPowerOff, FaCode } from 'react-icons/fa'

const Navbar = (props) => {
  const navRef = useRef()
  
  const showNavbar = () => {
    navRef.current.classList.toggle('responsive-nav')
  }
  
  return (
    <nav className="nav">
        {/* <div className="logo-container">
            <Link to=""><a href="/" className="logo-container-link">
                <img src={props.logo} alt="" className="logo-img"/>
                <div className="logo-text">
                    <h2 className="logo-header" style={{color: props.color}}>The Green Spoon</h2>
                    <p className="logo-description" style={{color: props.color}}>Meatless Foods • Meaty Flavors</p>
                </div>
            </a></Link>
        </div> */}
        <ul className="nav-link-container" ref={navRef}>
            <li className="nav-item"><Link to="/menu"><a href="" style={{color: props.navLinkColor}}>Menu</a></Link></li>
            <li className="nav-item"><Link to="/reservations"><a href="" style={{color: props.navLinkColor}}>Reservations</a></Link></li>
            <li className="nav-item"><Link to="/contacts"><a href="" style={{color: props.navLinkColor}}>Contact</a></Link></li>
            <button onClick={showNavbar} className="hamburger nav-close-button">
                <FaTimes />
            </button>
        </ul> 
        <button className="logout-btn" >Logout <FaPowerOff /></button>
        <button 
            onClick={showNavbar} 
            className="hamburger" 
            style={{color: props.color}}
        >
            <FaBars />
        </button>
    </nav>  
  )
}

export default Navbar