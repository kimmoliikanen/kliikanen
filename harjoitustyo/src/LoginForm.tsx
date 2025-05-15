import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig"; 

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Kirjautuminen onnistui!");
      setShowForm(false);
    } catch (error: any) {
      alert("Kirjautuminen epäonnistui: " + error.message);
    }
  };

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)} className="fetch-button">
        Kirjaudu
      </button>

      {showForm && (
        <div className="bg-white shadow-lg p-4 mt-2 rounded border">
          <input
            type="email"
            placeholder="Sähköposti"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="city-input"
          />
          <input
            type="password"
            placeholder="Salasana"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="city-input"
          />
          <button onClick={handleLogin} className="counter-button">
            Kirjaudu sisään
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginForm;