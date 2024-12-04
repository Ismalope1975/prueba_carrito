import { useLocation, useParams } from 'react-router-dom';
import { db } from '/src/firebase/config'; 
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const useProducts = () => {
  const location = useLocation();
  const { categoria } = useParams();  
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const normalizeString = (str) => {
    return str
      .toLowerCase()  
      .normalize('NFD')  
      .replace(/[\u0300-\u036f]/g, '');  
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('q');  

    const fetchProducts = async () => {
      setLoading(true);  
      setError(null);  
      try {
        const productosRef = collection(db, 'productos');
        let productosQuery = query(productosRef);

        if (categoria) {
          productosQuery = query(
            productosQuery, where('categoria', '==', categoria)
          );
        }

        const querySnapshot = await getDocs(productosQuery);
        const fetchedProducts = querySnapshot.docs.map(doc => ({
          id: doc.id, ...doc.data()
        }));

        if (searchTerm) {
          const normalizedSearchTerm = normalizeString(searchTerm);
          const filteredProducts = fetchedProducts.filter(producto => {
            const normalizedProductName = normalizeString(producto.nombre);
            return normalizedProductName.includes(normalizedSearchTerm);
          });
          setProductos(filteredProducts);  
        } else {
          setProductos(fetchedProducts);
        }
      } catch (err) {
        setError('Error importando productos');  
      } 

      setLoading(false);
    };

    fetchProducts();  
  }, [location.search, categoria]);  

  return { productos, loading, error, categoria };  
};

export default useProducts;
