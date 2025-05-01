import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

interface Product {
  id: string;
  name: string;
  price: number;
}

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products')); // ✅ HUOM! kokoelman nimi: 'products'
      const items: Product[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        items.push({ id: doc.id, name: data.name, price: data.price });
      });
      setProducts(items);
    };

    fetchProducts();
  }, []);

  const addProduct = async () => {
    const newProduct = { name: newName, price: newPrice };
    const docRef = await addDoc(collection(db, 'products'), newProduct);
    setProducts([...products, { ...newProduct, id: docRef.id }]);
    setNewName('');
    setNewPrice(0);
  };

  return (
    <div>
      <h2>Tuotelista</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name} – {product.price} €</li>
        ))}
      </ul>

      <div>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Tuotteen nimi"
        />
        <input
          type="number"
          value={newPrice}
          onChange={(e) => setNewPrice(parseFloat(e.target.value))}
          placeholder="Tuotteen hinta"
        />
        <button onClick={addProduct}>Lisää tuote</button>
      </div>
    </div>
  );
}

export default ProductList;