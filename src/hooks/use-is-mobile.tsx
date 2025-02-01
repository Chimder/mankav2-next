import { useEffect, useState } from 'react'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 767)

  useEffect(() => {
    function handleResize() {
      const newIsMobile = window.innerWidth <= 767
      if (newIsMobile !== isMobile) {
        setIsMobile(newIsMobile)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isMobile])

  return isMobile
}

export default useIsMobile
