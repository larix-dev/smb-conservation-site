import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route, Outlet, useLocation} from 'react-router-dom'

import Home from './pages/Home'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="gallery" element={<Gallery />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)

function Layout() {
  const location = useLocation()

  useEffect(() => {
    document.documentElement.scrollTo(0, 0)
  }, [location.pathname])

  const [bannerHeight, setBannerHeight] = useState(0)

  return (
    <>
      <header>
        {/*<Banner callback={height => setBannerHeight(height)} /> */}
        <Navbar />
      </header>
      <main className="flex" style={{minHeight: `calc(100vh - 60px - ${bannerHeight}px)`}}>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}
