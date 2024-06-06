import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./components/Home";
import { OffCanvas } from "./components/OffCanvas";

function App() {
  return (
    <div className="overflow-hidden">
      <Header />
      <OffCanvas />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
