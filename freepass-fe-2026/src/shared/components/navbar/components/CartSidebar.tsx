"use client"

import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/src/shared/hooks/useCart'

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cartItems, updateQuantity, clearCart, removeFromCart, getCartTotal, getCartItemsCount } = useCart()

  return (
    <>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] md:w-[450px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="bg-gradient-to-br from-[#215E61] to-[#18484b] flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-white">Shopping Cart</h2>
            {getCartItemsCount() > 0 && (
              <span className="bg-white text-gray-900 text-sm font-semibold px-3 py-1 rounded-full">
                {getCartItemsCount()}
              </span>
            )}
          </div>
          <button
              onClick={clearCart} 
              className='w-fit h-fit px-3 py-1 text-[#143e3f] bg-white hover:text-white hover:bg-[#143e3f] rounded-full transition-colors'
            >
              Delete All
            </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#143e3f] rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg mb-2">Your cart is empty</p>
              <p className="text-gray-400 text-sm mb-6">Add some products to get started</p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#18484b] text-white rounded-lg hover:bg-[#215E61] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 capitalize mb-2">
                      {item.category}
                    </p>
                    <p className="text-base font-semibold text-gray-900 mb-3">
                      ${item.price.toFixed(2)}
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="px-4 py-2 text-gray-900 font-medium min-w-[40px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                      >
                        <Trash2 className="w-5 h-5 text-gray-600 group-hover:text-red-600 transition-colors" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4">
            <div className="flex items-center justify-between text-lg">
              <span className="font-medium text-gray-700">Subtotal</span>
              <span className="font-bold text-gray-900">
                ${getCartTotal().toFixed(2)}
              </span>
            </div>

            <Link href="#" onClick={onClose}>
              <button className="w-full bg-[#18484b] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#215E61] transition-colors">
                Proceed to Checkout
              </button>
            </Link>

            <button
              onClick={onClose}
              className="w-full border-2 border-gray-300 text-gray-700 mt-2 py-3 rounded-lg font-medium hover:bg-[#215E61] hover:text-white hover:border-[#215E61] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
