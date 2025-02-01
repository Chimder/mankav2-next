// import { useEffect, useState } from 'react'

// function useIsMobile() {
//   const [isMobile, setIsMobile] = useState(false)

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const handleResize = () => {
//         const newIsMobile = window.innerWidth <= 767
//         setIsMobile(newIsMobile)
//       }

//       handleResize()

//       window.addEventListener('resize', handleResize)

//       return () => {
//         window.removeEventListener('resize', handleResize)
//       }
//     }
//   }, [])

//   return isMobile
// }

// export default useIsMobile
