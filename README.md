Descripción del Proyecto
Este proyecto es una tienda en línea construida con React y Vite, diseñada para la venta de instrumentos musicales, amplificadores, accesorios y consolas de audio. La aplicación proporciona una experiencia de compra fácil e interactiva para los usuarios, permitiéndoles navegar por productos, agregar artículos al carrito de compras y completar el proceso de pago de manera eficiente.

Características principales
Página Inicial

Al ingresar al sitio, los usuarios pueden ver un video publicitario que muestra las instalaciones y el ambiente del comercio.
La página también incluye una barra de navegación en la parte superior para facilitar la navegación por las diferentes secciones de la tienda.

Filtro de Productos
Los productos están organizados por categorías (por ejemplo, instrumentos, amplificadores, accesorios, etc.). Los usuarios pueden filtrar los productos de acuerdo a su interés desde la barra de navegación.
Los resultados se muestran en un formato de cards, con detalles básicos de cada producto (nombre, precio, etc.).

Búsqueda de Productos
También se incluye una barra de búsqueda donde los usuarios pueden ingresar texto (por ejemplo, "guitarra") para filtrar los productos y ver los resultados relevantes.

Página de Detalles del Producto
Cada card de producto tiene un botón que dirige al usuario a una página de detalles del producto donde podrá ver información más detallada, imágenes y especificaciones.
Los usuarios pueden agregar productos al carrito de compras desde esta página, eligiendo la cantidad deseada.

Carrito de Compras
El carrito de compras es accesible desde cualquier parte de la página mediante el Context de la aplicación.
Los usuarios pueden modificar las cantidades de los productos, eliminar artículos, vaciar el carrito o continuar con el proceso de compra.

Proceso de Pago
Al continuar con el proceso de compra, los usuarios son dirigidos a la pasarela de pagos, donde deben ingresar sus datos personales y los de su tarjeta de crédito.
La tarjeta de crédito es identificada a través de los primeros 8 dígitos para determinar su emisor.

Generación de Pedido
Una vez que los datos de pago se cargan correctamente, los usuarios pueden finalizar la compra, lo que generará un pedido en la base de datos.

Consulta de Estado del Pedido
Los usuarios pueden consultar el estado de su pedido a través de un enlace en la barra de navegación.
Ingresando su número de documento o número de orden, los clientes pueden acceder a la base de datos para verificar el estado de su pedido.

Tecnologías Utilizadas
React: Librería principal para la construcción de la interfaz de usuario.
Vite: Herramienta de construcción para el desarrollo rápido y optimizado.
Context API: Para gestionar el carrito de compras de manera centralizada en toda la aplicación.
React Router: Para la navegación entre diferentes secciones del sitio web.
API para pagos: Para procesar las transacciones de compra y gestionar la información de tarjetas.
Bootstrap para React: Utilizado para estilizar y hacer que la interfaz sea más responsiva y moderna, facilitando el diseño de componentes como la barra de navegación, las cards de productos y los formularios.


¡Gracias por visitar nuestra tienda!


