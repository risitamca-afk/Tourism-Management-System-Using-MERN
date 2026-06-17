import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import TransportNavbar from '../components/Navbar/TransportNavbar'
import CabSearchApp from '../components/Transport/CabSearchApp'

const CabSearchPage = () => {
  return (
    <div>
        <Navbar/>
        <TransportNavbar/>
        <CabSearchApp/>
    </div>
  )
}

export default CabSearchPage