import { useRef, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email) {
      emailRef.current?.focus();
      return;
    }

    if (!password) {
      passwordRef.current?.focus();
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Kirjautuminen onnistui!');
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }
      navigate('/');
    } catch (error: any) {
      alert('Kirjautuminen epäonnistui: ' + error.message);
    }
  };

  return (
    <div className="app-container">
     
        <div className="back-button-wrapper">
          <Link to="/" className="fetch-button">Takaisin</Link>
        </div>
      
      {/* Pääsisältö */}
      <main className="main-content">
        <div className="login-container">
          <h2 className="login-title">Kirjaudu sisään</h2>

          <div className="form-group">
            <label htmlFor="email">Sähköposti</label>
            <input
              ref={emailRef}
              type="email"
              id="email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Salasana</label>
            <input
              ref={passwordRef}
              type="password"
              id="password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember">Muista minut</label>
          </div>

          <button className="fetch-button" onClick={handleLogin}>
            Kirjaudu
          </button>

          <p className="register-link">
            Eikö sinulla ole tiliä? <Link to="/register">Rekisteröidy</Link>
          </p>
        </div>
      </main>

  
    </div>
  );
}