import {useState, useEffect} from 'react';
import {getFirestore, collection, getDocs, addDoc} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebaseConfig';

interface Product {
    id: string;
    name: string;
    price: number;
}

function ProductList() {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const [products, setProducts] = useState<Product[]>([]);
    const [newName, setNewName] = useState<string>('');
    const [newPrice, setNewPrice] =useState<number>(0);

    useEffect(() => {
    }, []);

    const addProduct = async () => {
        const newProduct: Product = { id: '', name: 'newName', price: 0};
        const docRef = await addDoc(collection(db, 'product'), newProduct);
        setProducts([...products, { ...newProduct, id: docRef.id }]);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewName(name);
        setNewPrice(parseFloat(value));
    }

    return (
        <div>
            <h2>Tuotelista</h2>
            <div>
                <input type="text" value={newName}
                onChange={handleInputChange} placeholder="Tuotteen nimi" />
                <input type="number" value={newPrice}
                onChange={handleInputChange} placeholder="Tuotteen hinta" />
                <button onClick={addProduct}>Lisää tuote</button>
            </div>
        </div>
    );

};