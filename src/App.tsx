import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import CountryRanking from "./components/CountryRanking";
import CountryDetail from "./components/CountryDetail";

function Logo() {
  const navigate = useNavigate();
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-[40%]">
      <img onClick={() => navigate("/")} src="/Logo.svg" alt="logo" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-[300px] bg-cover bg-[url('/hero-image-sm.jpg')] md:bg-[url('/hero-image.jpg')] bg-top bg-no-repeat">
        <Logo />
        <div className="absolute top-60 lg:top-55 left-0 right-0">
          <Routes>
            <Route path="/" element={<CountryRanking />} />
            <Route path="/countryDetail/:id" element={<CountryDetail />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
