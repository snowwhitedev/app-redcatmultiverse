import { useState, useEffect } from 'react'


const useDimensions = (breakPoint: any) => {

  const [isMobile, setIsMobile] = useState(false);
  const [vpWidth, setVpWidth] = useState(0);

  const updateDimension = () => {
    setVpWidth(window.innerWidth);
    setIsMobile(vpWidth <= breakPoint);
  }

  useEffect(() => {
    updateDimension();
    window.addEventListener('resize', updateDimension);
    return () => window.removeEventListener('resize', updateDimension);
  }, [vpWidth]);

  return ([isMobile, vpWidth])
}

export default useDimensions;