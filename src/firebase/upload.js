import { collection, addDoc } from "firebase/firestore";
import { db } from './config.js';
import { productos } from '../components/arrayproductos.js';

const uploadProductos = async () => {
    const productosRef = collection(db, "productos");
    for (const producto of productos) {
        const { id, ...productoSinId } = producto;
        try {
            const docRef = await addDoc(productosRef, productoSinId);
            console.log(`Producto subido por ID: ${docRef.id}`);
            console.log(productoSinId);
        } catch (error) {
            console.error("Error al subir el archivo", error);
        }
    }
};

uploadProductos();