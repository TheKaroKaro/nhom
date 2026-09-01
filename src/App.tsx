import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { useRoute } from "./lib/hooks";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { Portfolio } from "./pages/Portfolio";
import { Products } from "./pages/Products";

export default function App() {
  const { route } = useRoute();

  return (
    <div className="relative flex min-h-screen flex-col bg-paper text-ink">
      {/* Ambient film grain over the whole canvas */}
      <div className="noise-layer pointer-events-none fixed inset-0 z-50" aria-hidden />

      <Header route={route} />

      {/* Keyed by route so the entrance animation replays on navigation */}
      <main key={route} className="page-enter grow">
        {route === "/" && <Home />}
        {route === "/products" && <Products />}
        {route === "/portfolio" && <Portfolio />}
        {route === "/contact" && <Contact />}
      </main>

      <Footer />
    </div>
  );
}
