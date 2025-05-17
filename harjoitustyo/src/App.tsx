import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Weather from './Weather';
import Kauppalista from './Kauppalista'; 
import LoginPage from './LoginPage';



function App() {

  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowCookieBanner(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowCookieBanner(false);
  };

  return (
    <div className="app-container">
      {/* Yläpalkki */}
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">Päiväkotivaatetus</h1>
          <nav>
            <Link to="/" className="fetch-button">Etusivu</Link>
            <Link to="/kaupat" className="fetch-button" >Kaupat</Link>
            <Link to="/login" className="fetch-button">Kirjaudu</Link>
          </nav>
        </div>
      </header>

      {/* Pääsisältö */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={
            <>
              <Weather />
            </>
          } />
        
          <Route path="/login" element={<LoginPage />} />
          <Route path="/kaupat" element={<Kauppalista />} />
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </main>

      {/* Alapalkki */}
      <footer className="footer">
        <p>&copy; 2025 Päiväkotivaatetus. Kaikki oikeudet pidätetään.</p>
      </footer>

      {/* Evästebanneri */}
      {showCookieBanner && (
        <div className="cookie-banner">
          Tämä sivusto käyttää evästeitä.
          <button onClick={handleAcceptCookies}>OK</button>
        </div>
      )}
    </div>
  );
}

export default App;