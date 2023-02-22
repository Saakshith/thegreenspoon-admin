import React from 'react'
import Navbar from "../Navbar/Navbar"
import logoDark from "../green_spoon_logo.png"

const Reservations = () => {
  return (
    <div>
      <Navbar 
        logo={logoDark}
        color="black"
        navLinkColor="black"
      />
      <h2 className="page-title"></h2>
    </div>
  )
}

export default Reservations