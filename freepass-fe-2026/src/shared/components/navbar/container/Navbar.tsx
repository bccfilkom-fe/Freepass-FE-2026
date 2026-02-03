"use client"

import { Search, User, ShoppingCart, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import SearchBar from '../components/SearchBar'
import LoginSidebar from '../components/LoginSideBar'
import CartSidebar from '../components/CartSidebar'
import { useCart } from '@/src/shared/hooks/useCart'
import { useAuth } from '@/src/shared/hooks/useAuth'
import Image from 'next/image'

export default function Navbar() {
  const pathname = usePathname()
  const { getCartItemsCount } = useCart()
  const { isAuthenticated, user } = useAuth()
  
  const [showSearch, setShowSearch] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const cartItemsCount = getCartItemsCount()

  return (
    <>
      <nav className="bg-gradient-to-br from-[#215E61] to-[#18484b] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/home">
              <Image src="/logoShopPutih.png" alt="logoNav" width={128} height={12} />
            </Link>

            <ul className="hidden md:flex items-center gap-6 text-base xl:text-lg">
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

            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 text-gray-300 hover:text-white hover:bg-[#143e3f] rounded-full transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={() => setShowLogin(true)}
                className="p-2 text-gray-300 hover:text-white hover:bg-[#143e3f] rounded-full transition-colors relative"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
                {isAuthenticated && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
                )}
              </button>

              <button
                onClick={() => setShowCart(true)}
                className="p-2 text-gray-300 hover:text-white hover:bg-[#143e3f] rounded-full transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute hidden lg:flex -top-1 -right-1 bg-white text-[#18484b] text-xs font-bold rounded-full w-5 h-5 items-center justify-center">
                    {cartItemsCount > 9 ? '9+' : cartItemsCount}
                  </span>
                )}
              </button>
            </div>

            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-white hover:text-gray-900"
            >
              {showMobileMenu ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
          
          {showSearch && (
            <div className="hidden md:block pb-4">
              <SearchBar onClose={() => setShowSearch(false)} />
            </div>
          )}

          {showMobileMenu && (
            <div className="md:hidden border-t border-gray-200 py-4 space-y-4">
              <SearchBar onClose={() => setShowMobileMenu(false)} />

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
                  onClick={() => {
                    setShowLogin(true)
                    setShowMobileMenu(false)
                  }}
                  className="flex flex-col items-center gap-1 text-white hover:text-[#1b767a]"
                >
                  <User className="w-6 h-6" />
                  <span className="text-xs">
                    {isAuthenticated ? user?.username : 'Login'}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setShowCart(true)
                    setShowMobileMenu(false)
                  }}
                  className="flex flex-col items-center gap-1 text-white hover:text-[#1b767a] relative"
                >
                  <ShoppingCart className="w-6 h-6" />
                  <span className="text-xs">Cart ({cartItemsCount})</span>
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 left-1/2 bg-white text-[#18484b] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemsCount > 9 ? '9+' : cartItemsCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <LoginSidebar isOpen={showLogin} onClose={() => setShowLogin(false)} />
      <CartSidebar isOpen={showCart} onClose={() => setShowCart(false)} />
    </>
  )
}
