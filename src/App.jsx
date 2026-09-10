import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import RouteFallback from "./components/ui/RouteFallback";
import Home from "./pages/Home";

/**
 * The home page ships in the initial bundle because it is where almost every
 * visitor lands. Everything else is split out and fetched on navigation.
 */
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Gallery = lazy(() => import("./pages/Gallery"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Book = lazy(() => import("./pages/Book"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="*"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="services" element={<Services />} />
                <Route path="services/:slug" element={<ServiceDetail />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="gallery" element={<Gallery />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="book" element={<Book />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
