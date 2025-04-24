import { useState, useEffect, useCallback } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginForm from './LoginForm'; 
import ProductList from './ProductList';

function App() {
  //asetetaan cookie
  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  };

  //luetaan cookie
  const getCookie = (name: string): number | 0 => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const num = parseInt(decodeURIComponent(parts.pop()?.split(';').shift() || ''), 10);
      return num;
    }
    return 0;
  };

  const [count, setCount] = useState(getCookie('Count') | 0 )

  const handleClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>((event) => {
    console.log('Nappi painettu: (' + event.pageX + ', ' + event.pageY + ')');
    setCount((count)) => count + 1);
    setCookie('Count', "" + (count + 1), 1);
  }, [setCookie]);

  useEffect(() => {  
    var _mtm = window._mtm = window._mtm || [];
    _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
    const d=document, g=d.createElement('script'), s: HTMLScriptElement=d.getElementsByTagName('script')[0];
    g.async=true; g.src='https://pilvipalvelut-matomo.2.rahtiapp.fi/js/container_{{omakoodi}}.js'; 
    if (s && s.parentNode) {
      s.parentNode.insertBefore(g,s);
    }
  }, []);

    return (
        <div>
            <h1>Hello World</h1>
        </div>
    )
   }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <div className="App">
        <LoginForm />
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
