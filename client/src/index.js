import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route, Outlet, useLocation} from 'react-router-dom'
import {ErrorBoundary} from 'react-error-boundary'
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'
import axios from 'axios'

import Home from './pages/Home'
import About from './pages/About'
import Burial from './pages/Burial'
import Disclaimer from './pages/Disclaimer'
import Gallery from './pages/Gallery'
import Privacy from './pages/Privacy'
import Feedback from './pages/Feedback'
import Map from './pages/Map'
import InterMap from './pages/InterMap'
import ProductsServices from './pages/ProductsServices'
import Product from './pages/Product'

import Banner from './components/Banner'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MessagePage from './components/MessagePage'

import './index.css'

axios.defaults.baseURL = process.env.REACT_APP_API_URL

const apollo = new ApolloClient({
  uri: `${process.env.REACT_APP_API_URL}/api/graphql`,
  cache: new InMemoryCache()
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ApolloProvider client={apollo}>
      <BrowserRouter>
        <Routes>
          <Route path="interactive-map" element={<InterMap />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="green-burial" element={<Burial />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="map" element={<Map />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="disclaimer" element={<Disclaimer />} />
            <Route path="privacy-policy" element={<Privacy />} />
            <Route path="products-services" element={<ProductsServices />} />
            <Route path="products-services/:itemId" element={<Product />} />
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
        <ErrorBoundary fallback={<GenericError />} key={location.pathname}>
          <Outlet />
        </ErrorBoundary>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

function PageNotFound() {
  return (
    <MessagePage name="404: Page Not Found">
      The page that you requested was not found.
      <br />
      Please verify that the URL is correct and try again.
    </MessagePage>
  )
}

function GenericError() {
  return (
    <MessagePage name="Error">
      An unexpected error has occurred.
      <br />
      We apologize for the inconvenience. Please try again later.
    </MessagePage>
  )
}
