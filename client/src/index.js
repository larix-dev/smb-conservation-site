import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route, Outlet, useLocation} from 'react-router-dom'
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'

import Home from './pages/Home'
import About from './pages/About'
import ProductsServices from './pages/ProductsServices'
import ProductInfo from './pages/ProductInfo'
import Page from './components/Page'
import Banner from './components/Banner'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import './index.css'

const apollo = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  cache: new InMemoryCache()
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ApolloProvider client={apollo}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="products-services" element={<ProductsServices />} />
            <Route path="products-services/:itemId" element={<ProductInfo />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
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
        <Banner callback={height => setBannerHeight(height)} />
        <Navbar />
      </header>
      <main className="flex" style={{minHeight: `calc(100vh - 80px - ${bannerHeight}px)`}}>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

function PageNotFound() {
  return (
    <Page name="404: Page Not Found">
      <div className="bg-stone-300 text-center p-2">
        The page that you requested was not found.
        <br />
        Please verify that the URL is correct and try again.
      </div>
    </Page>
  )
}
