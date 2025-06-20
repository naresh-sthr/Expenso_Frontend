import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Layout = () => {
  return (
    <>
      <Navbar/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </>
  )
}

export default Layout
