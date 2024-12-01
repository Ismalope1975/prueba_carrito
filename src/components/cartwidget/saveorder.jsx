import { db } from '/src/firebase/config.js'; 
import { addDoc, collection } from 'firebase/firestore';
import Swal from 'sweetalert2';

const saveOrder = async (customerData, cartItems, installments, cardData) => {
  try {
    // Preparar la información para guardar en Firebase
    const orderData = {
      date: new Date(),  // Usamos el formato estándar de JavaScript Date
      customer: {
        name: customerData.name,
        document: customerData.document,
        address: customerData.address,
        phone: customerData.phone,
        observations: customerData.observations,
      },
      cart: cartItems.map(item => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        subtotal: item.subtotal,
      })),
      total: cartItems.reduce((total, item) => total + item.subtotal, 0),  // Total de la compra
      payment: {
        status: 'yes',  // Suponemos que el pago fue confirmado
        installments: installments,
        cardDetails: {
          number: cardData.number,
          expiry: cardData.expiry,
          cvc: cardData.cvc,
        },
      },
      pending: false,  // El pago está confirmado
    };

    // Guardar la orden en Firestore
    const ordersCollection = collection(db, 'orders');

    // Intentar agregar el documento a la colección de Firebase
    const docRef = await addDoc(ordersCollection, orderData);
    
    console.log("Document written with ID: ", docRef.id);  // Log para verificar si el documento se guardó

    // Mostrar mensaje de éxito
    Swal.fire({
      icon: 'success',
      title: '¡Pago confirmado!',
      text: 'Su pedido ha sido procesado con éxito.',
    });

    return true;
  } catch (error) {
    console.error('Error al guardar la orden: ', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `Hubo un error al procesar el pago. Error: ${error.message}`,
    });
    return false;
  }
};

export default saveOrder;
