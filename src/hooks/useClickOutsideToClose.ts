import { useEffect } from 'react'

const useClickOutsideToClose = (
  targetRef: React.RefObject<HTMLDivElement>,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  useEffect(() => {
    const hideDropdownMenu = (event: MouseEvent) => {
      const clickedTarget = targetRef.current?.contains(event.target as Node)

      if (!clickedTarget) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', hideDropdownMenu)

    return () => {
      document.removeEventListener('mousedown', hideDropdownMenu)
    }
  }, [setIsOpen, targetRef])
}

export default useClickOutsideToClose
