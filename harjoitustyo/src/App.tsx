import { useState } from 'react';
import Weather from './Weather';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app-container">
      {/* Yläpalkki */}
      <header className="header">
        <h1 className="header-title">Päiväkotivaatetus</h1>
      </header>

      {/* Pääsisältö */}
      <main className="main-content">
        <Weather />
        <button className="counter-button" onClick={() => setCount(count + 1)}>
          count is {count}
        </button>
      </main>

      {/* Alapalkki */}
      <footer className="footer">
        <p>&copy; 2025 Päiväkotivaatetus. Kaikki oikeudet pidätetään.</p>
      </footer>
    </div>
  );
}

export default App;