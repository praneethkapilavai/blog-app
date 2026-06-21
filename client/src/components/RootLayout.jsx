import React from 'react'
import Header from './common/Header'
import Footer from './common/Footer'
import { Outlet } from 'react-router-dom'

export function RootLayout() {
  return (
    <div >
      <Header />
      <div style={{ minHeight: '86vh' }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default RootLayout
