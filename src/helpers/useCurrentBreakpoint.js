import { useState, useEffect } from "react";
import newTheme from "../theme";

const getCurrentBreakpoint = () => {
  const queries = newTheme.breakpoints.map((breakpoint) => {
    return window.matchMedia(`(min-width: ${breakpoint})`);
  });

  const selectBreakpoint = {
    // isMobile
    isTablet: queries[1].matches,
    isDesktop: queries[2].matches,
  };

  return selectBreakpoint;
};

const useCurrentBreakpoint = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState({
    isTablet: false,
    isDesktop: false,
  });
  console.log(
    "🚀 ~ file: useCurrentBreakpoint.js ~ line 20 ~ useCurrentBreakpoint ~ currentBreakpoint",
    currentBreakpoint
  );

  useEffect(() => {
    setCurrentBreakpoint(getCurrentBreakpoint());
  }, []);

  useEffect(() => {
    const onResize = () => {
      setCurrentBreakpoint(getCurrentBreakpoint());
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  });

  return currentBreakpoint;
};

export default useCurrentBreakpoint;
