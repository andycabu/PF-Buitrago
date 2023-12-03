import { useEffect, useState } from "react";

export function useScreenWidth() {
  const [screenWidth, setScreenWidth] = useState();

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      if (newWidth !== screenWidth) {
        setScreenWidth(newWidth);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenWidth]);
  return screenWidth;
}
