import React, {useState, useEffect} from 'react'
import {Collapse} from 'react-collapse'
import {useLocation} from 'react-router-dom'
import cx from 'classnames'

import Logo from './Logo'
import NavLink from './NavLink'

import './Navbar.css'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [windowSize, setWindowSize] = useState(window.innerWidth)

  const location = useLocation()

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  useEffect(() => {
    const handleResize = () => setWindowSize(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <nav className="flex justify-center bg-teal-900">
      <div className="max-w-screen-lg w-full flex items-center justify-between flex-wrap p-4">
        <Logo />
        <div className="block lg:hidden">
          <NavbarToggle onToggle={() => setIsOpen(!isOpen)} isOpen={isOpen} />
        </div>
        <div className="w-full lg:w-auto">
          <NavbarMenu isOpen={isOpen} windowSize={windowSize}>
            <div className="flex flex-col lg:flex-row gap-6 text-sm font-bold pt-8 pb-4 lg:p-0">
              <NavLink to="/" name="Home" />
              <NavLink to="/about" name="About Us" />
              <NavLink to="/trails" name="Trails & Map" />
              <NavLink to="/ecosystem" name="Ecosystem" />
              <NavLink to="/products-services" name="Products & Services" />
              <NavLink to="/green-burial" name="Green Burial" />
              <NavLink to="/gallery" name="Gallery" />
            </div>
          </NavbarMenu>
        </div>
      </div>
    </nav>
  )
}

function NavbarMenu(props) {
  if (props.windowSize >= 1024) {
    return <>{props.children}</>
  } else {
    return (
      <Collapse isOpened={props.isOpen} theme={{collapse: 'transition-[height] duration-300'}}>
        {props.children}
      </Collapse>
    )
  }
}

function NavbarToggle(props) {
  return (
    <button className={cx('nav-icon', {open: props.isOpen})} onClick={props.onToggle}>
      <span className={cx({'mt-[-8px]': !props.isOpen, 'mt-0 opacity-0': props.isOpen})}></span>
      <span className={cx({'mt-[8px]': !props.isOpen, 'mt-0 opacity-0': props.isOpen})}></span>
      <span className={cx({'opacity-0': !props.isOpen, 'opacity-1 rotate-45': props.isOpen})}></span>
      <span className={cx({'opacity-0': !props.isOpen, 'opacity-1 -rotate-45': props.isOpen})}></span>
    </button>
  )
}

export default Navbar
