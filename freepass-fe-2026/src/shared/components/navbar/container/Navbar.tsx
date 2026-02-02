"use client"

import { List, LogIn, LogInIcon, Menu, PercentSquareIcon, PersonStanding, SearchIcon, ShoppingBag, ShoppingCart, User, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  // const { getCartItemsCount } = useCart()
  // const { isAuthenticated, user } = useAuth() 
  // const [showSearch, setShowSearch] = useState(false)
  // const [showLogin, setShowLogin] = useState(false)
  // const [showCart, setShowCart] = useState(false)
  // const cartItemsCount = getCartItemsCount()

  return (
    <nav className="bg-gradient-to-br from-[#215E61] to-[#18484b] flex mycontainer items-center justify-between">
      <Link href="/home">
        <Image src="/logoShopPutih.png" alt="logoNav" width={128} height={12} />
      </Link>

      <ul className="hidden md:flex items-center gap-4 text-base xl:text-lg">
        <li>
          <Link
            href="/home"
            className={`hover:text-white hover:font-semibold transition-all ${
              pathname === "/home"
                ? "text-white font-semibold"
                : "text-[#FEF8F5]"
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/shop"
            className={`hover:text-white hover:font-semibold transition-all ${
              pathname === "/shop"
                ? "text-white font-semibold"
                : "text-[#FEF8F5]"
            }`}
          >
            Shop
          </Link>
        </li>
      </ul>
      


      <div className='gap-4 hidden md:flex'>
        <button 
          // onClick={() => setShowSearch(!showSearch)}
          className='p-2 hover:bg-[#143e3f] text-gray-300 rounded-full hover:text-white transition-colors cursor-pointer'
        >
          <SearchIcon className='w-5 h-5'/>
        </button>

        <button 
          // onClick={() => setShowLogin(true)}
          className='p-2 hover:bg-[#143e3f] text-gray-300 rounded-full hover:text-white transition-colors cursor-pointer'
        >
          <User className='w-5 h-5'/>
          {/* {isAuthenticated && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
          )} */}
        </button>

        <button 
          // onClick={() => setShowCart(true)}
          className='p-2 hover:bg-[#143e3f] text-gray-300 rounded-full hover:text-white transition-colors cursor-pointer'
        >
          <ShoppingCart className='w-5 h-5'/>
          {/* {cartItemsCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartItemsCount > 9 ? '9+' : cartItemsCount}
            </span>
          )} */}
        </button>
      </div>
      
      
      <div className="block md:hidden">
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="md:hidden p-2 text-white hover:text-gray-900"
        >
          {showMobileMenu ? (
          <X className="w-6 h-6" />) : (
          <Menu className="w-6 h-6" />
          )}
        </button>

        {showMobileMenu &&(
          <div className="md:hidden border-t border-gray-200 py-4 space-y-4">
            {/* <SearchBar onClose={() => setShowMobileMenu(false)} /> */}

            <div className="space-y-2">
              <Link
                href="/home"
                onClick={() => setShowMobileMenu(false)}
                className={`block text-white px-4 py-2 rounded-lg transition-colors ${
                  pathname === '/home'
                    ? 'bg-[#1b767a] font-semibold'
                    : 'hover:bg-[#1b767a]'
                }`}
              >
                Home
              </Link>
              <Link
                href="/shop"
                onClick={() => setShowMobileMenu(false)}
                className={`block text-white px-4 py-2 rounded-lg transition-colors ${
                  pathname === '/shop'
                    ? 'bg-[#1b767a] font-semibold'
                    : 'hover:bg-[#1b767a]'
                }`}
              >
                Shop
              </Link>
            </div>

            <div className="flex items-center justify-around pt-4 border-t border-gray-200">
              <button
                // onClick={() => {
                //   setShowLogin(true)
                //   setShowMobileMenu(false)
                // }}
                className="flex flex-col items-center gap-1 text-white hover:text-[#1b767a]"
              >
                <User className="w-6 h-6" />
                {/* <span className="text-xs">
                  {isAuthenticated ? user?.username : 'Login'}
                </span> */}
              </button>

              <button
                // onClick={() => {
                //   setShowCart(true)
                //   setShowMobileMenu(false)
                // }}
                className="flex flex-col items-center gap-1 text-white hover:text-[#1b767a] "
              >
                <ShoppingCart className="w-6 h-6" />
                {/* <span className="text-xs">Cart ({cartItemsCount})</span>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 left-1/2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount > 9 ? '9+' : cartItemsCount}
                  </span>
                )} */}
              </button>
            </div>
          </div>
        )}
      </div> 
    </nav>
  );
};

export default Navbar;