import { useEffect } from "react";
import { site } from "../lib/siteConfig";

/**
 * Per-route document title and meta description. React 19 can hoist <title>
 * from anywhere in the tree, but doing it here keeps every page's SEO
 * declaration on one line at the top of the component.
 */
export default function useSeo({ title, description }) {
  useEffect(() => {
    const previous = document.title;
    document.title = title ? `${title} | ${site.name}` : `${site.name} — ${site.tagline}`;

    let meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.getAttribute("content");
    if (description && meta) meta.setAttribute("content", description);

    return () => {
      document.title = previous;
      if (description && meta && previousDescription) {
        meta.setAttribute("content", previousDescription);
      }
    };
  }, [title, description]);
}
