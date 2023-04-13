import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import { Suspense, lazy } from "react";


let homePage_lazy = lazy(() => import("./pages/HomePage"));
let AboutPage_lazy = lazy(() => import("./pages/AboutPage"));
let NotFound_lazy = lazy(() => import("./pages/NotFound"));

export function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route index element={<Suspense> fallback="loading..."<HomePage /></Suspense>} />
          <Route path="about" element={<Suspense> fallback="loading..."<AboutPage /></Suspense>} />
          <Route path="*" element={<Suspense> fallback="loading..."<NotFound /></Suspense>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
