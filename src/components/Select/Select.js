import cn from 'clsx'
import { useState } from 'react'

const Select = ({ className, defaultValue, dropdownClassName, options, onSelect }) => {
  const [currentValue, setCurrentValue] = useState(defaultValue)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleOnSelect = (e) => {
    e.stopPropagation()

    onSelect(e.target.textContent)
    setCurrentValue(e.target.textContent)
    setMenuOpen(false)
  }

  const handleMenuOpen = (e) => {
    e.stopPropagation()
    setMenuOpen(true)
  }

  return (
    <div role="button" aria-hidden className={className} onClick={handleMenuOpen}>
      <div className="relative">
        <p className="text-center">{currentValue}</p>
        <div
          className={cn(
            'w-full absolute bg-transparent outline-none top-8 rounded-md',
            dropdownClassName
          )}
        >
          {menuOpen &&
            options?.length &&
            options.map((item, idx) => (
              <div
                role="option"
                key={idx}
                aria-selected
                aria-hidden
                value={item.value}
                onClick={handleOnSelect}
                className="bg-slate-700 p-2 block text-center hover:bg-slate-800"
              >
                {item.label}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

Select.defaultProps = {
  options: [],
  onSelect: () => null,
  defaultValue: '',
}
export default Select
