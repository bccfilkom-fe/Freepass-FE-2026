'use client'

import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'

type SwitchProps = {
  className?: string
  checked: boolean
  onToggle: (checked: boolean) => void
}

const Switch = ({ className, checked, onToggle }: SwitchProps) => {
  const [isChecked, setIsChecked] = useState(checked)

  useEffect(() => {
    setIsChecked(checked)
  }, [checked])

  const handleToggle = () => {
    setIsChecked(prev => {
      const next = !prev
      onToggle(next)
      return next
    })
  }

  return (
    <div className={className}>
      <AnimatePresence mode="popLayout">
        <motion.button
          key={isChecked ? 'checked' : 'unchecked'}
          onClick={handleToggle}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className={`
            p-2 rounded-full cursor-pointer relative flex items-center justify-center w-[50px] h-[50px] 
            bg-primary-foreground text-primary`
          }
        >
          <AnimatePresence mode="wait">
            {isChecked ? (
              <motion.span
                key="moon"
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="absolute"
              >
                <Moon size={28} />
              </motion.span>
            ) : (
              <motion.span
                key="sun"
                initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="absolute"
              >
                <Sun size={28} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </AnimatePresence>
    </div>
  )
}

export default Switch