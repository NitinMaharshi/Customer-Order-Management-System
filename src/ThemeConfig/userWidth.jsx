import { useState, useEffect } from 'react';

export default function useWidth() {
  // states
  const [width, setWidth] = useState(window?.innerWidth);

  // breakpoints
  const breakpoints = {
    sm: '640',
    md: '768',
    lg: '1024',
    xl: '1280'
  };

  // resize window size and set width by useEffect
  useEffect(() => {
    const handleResize = () => {
      setWidth(window?.innerWidth);
    };
    window?.addEventListener('resize', handleResize);
    return () => {
      window?.removeEventListener('resize', handleResize);
    };
  }, []);

  return { width, breakpoints };
}
