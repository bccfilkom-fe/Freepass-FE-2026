'use client'

import { Moon, Sun } from 'lucide-react'
import React, { useId } from 'react'
import styled from 'styled-components'
import clsx from 'clsx'

type SwitchProps = {
  className?: string
  checked: boolean
  onToggle: (checked: boolean) => void
}

const Switch = ({ className, checked, onToggle }: SwitchProps) => {
  const id = useId()

  return (
    <StyledWrapper className={className}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onToggle(e.target.checked)}
      />

      <label
        htmlFor={id}
        className={clsx(
          'toggleSwitch',
          'bg-primary-foreground text-primary',
          checked && 'is-checked'
        )}
      >
        <Sun className="icon sun" size={28} />
        <Moon className="icon moon" size={28} />
      </label>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  input {
    display: none;
  }

  .toggleSwitch {
    width: 50px;
    height: 50px;
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    background-color: var(--primary-foreground);
    color: var(--primary);
    transition:background-color 0.3s ease, color 0.3s ease,transform 0.15s ease;
    outline: none;
    border: none;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    will-change: transform;
    backface-visibility: hidden;
    transform: translateZ(0);
  }

  .toggleSwitch:focus,
  .toggleSwitch:focus-visible {
    outline: none;
    box-shadow: none;
  }

  .toggleSwitch:active {
    transform: scale(0.92);
  }

  .icon {
    position: absolute;
    pointer-events: none;
    transition:
      opacity 0.25s ease,
      transform 0.25s ease;
  }

  .sun {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }

  .moon {
    opacity: 0;
    transform: scale(0.5) rotate(-90deg);
  }

  .is-checked {
    .sun {
      opacity: 0;
      transform: scale(0.5) rotate(90deg);
    }

    .moon {
      opacity: 1;
      transform: scale(1) rotate(0deg);
    }
  }
`

export default Switch;