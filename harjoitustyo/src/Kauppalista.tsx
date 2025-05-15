import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

type Kauppa = {
  nimi: string;
  url: string;
  kuvaus: string;
};

const Kauppalista = () => {
  const [kaupat, setKaupat] = useState<Kauppa[]>([]);

  useEffect(() => {
    const fetchKaupat = async () => {
      const snapshot = await getDocs(collection(db, "kaupat"));
      const data = snapshot.docs.map(doc => doc.data() as Kauppa);
      setKaupat(data);
    };

    fetchKaupat();
  }, []);

  return (
    <div className="kauppalista">
    <h2 style={{ marginBottom: '32px' }}>Suositut lastenvaatekaupat</h2>
      <ul>
        {kaupat.map((kauppa, idx) => (
          <li key={idx} className="kauppa">
            <a
              href={kauppa.url}
              target="_blank"
              rel="noopener noreferrer"
              className="kauppa-nimi"
            >
              {kauppa.nimi}
            </a>
            <p className="kauppa-kuvaus">{kauppa.kuvaus}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Kauppalista;