import { useCallback, useEffect, useState } from "react";

export const useScreenWidth = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [dimension, setDimension] = useState(0);

  const updateDimension = useCallback(() => {
    setDimension(window.innerWidth);
    setIsMobile(dimension <= 1024);
  }, [dimension])

  useEffect(() => {
    updateDimension();
    window.addEventListener('resize', updateDimension);
    return () => window.removeEventListener('resize', updateDimension);

  }, [dimension, updateDimension]);

  return { isMobile }
}
