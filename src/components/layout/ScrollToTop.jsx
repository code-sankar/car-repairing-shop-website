import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Router navigation does not reset scroll on its own. Jump to the top on every
 * path change, unless the visitor is following an in-page hash link.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}
