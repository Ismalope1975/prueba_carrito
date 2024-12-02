
import { db } from '/src/firebase/config'; 
import { collection, query, where, getDocs } from 'firebase/firestore';

export const searchProducts = async (searchTerm) => {
  try {
 
    const lowerCaseTerm = searchTerm.toLowerCase();
    const productosRef = collection(db, "productos"); 

    
    const q = query(
      productosRef,
      where("nombre", ">=", lowerCaseTerm), 
      where("nombre", "<=", lowerCaseTerm + '\uf8ff') 
    );

    const querySnapshot = await getDocs(q); 
    const productos = [];

    querySnapshot.forEach((doc) => {
      productos.push({ id: doc.id, ...doc.data() }); 
    });

    return productos; 
  } catch (error) {
    console.error("Error al buscar productos:", error);
    throw new Error("No se pudieron obtener los productos.");
  }
};
