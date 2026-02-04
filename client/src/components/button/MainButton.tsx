import React from 'react'
import Spinner from '../ui/spinner'

type Props = {
  variant?: 'primary' | 'secondary' | "outline" | "destructive",
  className?: string,
  children: React.ReactNode,
  onClick?: () => void,
  up?: string,
  type?: "submit" | "reset" | "button" | undefined
  disabled?: boolean,
  isLoading?: boolean,
  animated?: boolean
}

const MainButton = ({ animated = true, isLoading = false, disabled = false, type, onClick, variant = "primary", className, children, up }: Props) => {
  return (
    <button
      disabled={disabled || isLoading}
      type={type}
      onClick={onClick}
      className={`group lando-transition uppercase text-md w-fit h-fit py-[.6em] px-[.8em] rounded-md flex flex-col items-center relative whitespace-nowrap shadow-2xs
      transition-all duration-300 leading-4
      ${(disabled || isLoading) ? "cursor-not-allowed opacity-80" : "cursor-pointer hover:scale-102 active:scale-95 hover:shadow-none"}
      ${variant === "primary" && "bg-primary-foreground hover:bg-primary-foreground/90"}
      ${variant === "secondary" && "bg-secondary-foreground hover:bg-secondary-foreground/90"}
      ${variant === "outline" && `border border-primary-foreground backdrop-blur-2xl hover:brightness-110`}
      ${variant === "destructive" && `bg-primary-foreground hover:bg-primary-foreground/90`} `
      + className}
      >
        {isLoading ? (
          <Spinner color='var(--primary)'/>
        ) : (
          animated ? (
            <>
              <div className='flex py-0.5 flex-col gap-1 relative overflow-hidden'>
                <span className=''>
                  { typeof children !== "string" ? children : Array.from(children).map((char, index) => (
                      <span
                        key={index}
                        style={{ transitionDelay: `${index * 20}ms` }}
                        className={`
                          inline-block
                          transition-all duration-300
                          translate-y-0
                          ${!(disabled || isLoading) && "group-hover:-translate-y-5"}
                          ${variant === "primary" && "text-primary"}
                          ${variant === "secondary" && "text-secondary"}
                          ${variant === "outline" && "text-primary-foreground"}
                          ${variant === "destructive" && "text-destructive font-semibold"}
                        `}
                      >
                        {char === " " ? "\u00A0" : char}
                      </span>
                  )) }
                </span>

                { typeof children === "string" && (
                  <span className="absolute top-full left-1/2 -translate-x-1/2 mt-0.5 flex">
                    {Array.from(children).map((char, index) => (
                      <span
                        key={index}
                        style={{ transitionDelay: `${index * 20}ms` }}
                        className={`
                          inline-block
                          transition-all duration-300
                          translate-y-0
                          ${up ? up : !(disabled || isLoading) && "group-hover:-translate-y-5"}
                          ${variant === "primary" && "text-primary"}
                          ${variant === "secondary" && "text-secondary"}
                          ${variant === "outline" && "text-primary-foreground"}
                          ${variant === "destructive" && "text-destructive font-semibold"}
                        `}
                      >
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                  </span>
                ) }
              </div>
            </>
          ) : (
            <span
              className={`
                flex gap-2 w-full justify-center items-center
                transition-all duration-300
                ${variant === "primary" && "text-primary"}
                ${variant === "secondary" && "text-secondary"}
                ${variant === "outline" && "text-primary-foreground"}
              `}
            >
              {children}
            </span>
          )
        )}
    </button>
  )
}

export default MainButton