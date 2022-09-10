import React from "react"
import { Link } from "gatsby"

const Logo = () => {
    return (
        <Link to="/" className="text-3xl text-[#191a20] font-bold tracking-wide uppercase">
            Arghz
        </Link>
    )
}

const Menu = () => {
    return (
        <div class="font-sans text-sm text-[#7a7a7a] hidden lg:flex">
            <Link to="/" className="block mt-4 lg:inline-block hover:text-[#fba70b] lg:mt-0 mr-10 uppercase"
                  activeClassName="text-[#fba70b]">
                Home
            </Link>
            <Link to="/connect4" className="block mt-4 lg:inline-block hover:text-[#fba70b] lg:mt-0 mr-10 uppercase"
                  activeClassName="text-[#fba70b]">
                Connect4
            </Link>
            <Link to="#" className="block hover:text-[#fba70b] mt-4 lg:inline-block lg:mt-0 uppercase"
                  activeClassName="text-[#fba70b]">
                About
            </Link>
        </div>
    )
}

const Hamburger = () => {
    return (
        <div class="flex items-center">
            <div class="block lg:hidden">
                <button class="flex items-center px-4 py-3 border rounded text-teal-500 border-teal-500 focus:outline-none">
                    <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

const Header = () => {
    return (
        <header>
            <nav class="flex items-center justify-between p-6 container mx-auto">
                <Logo />
                <Menu />
                <Hamburger />
            </nav>
        </header>
    )
  }
  
  export default Header