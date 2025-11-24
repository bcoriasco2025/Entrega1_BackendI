# Proyecto: API de Productos de Limpieza y Carrito de Compras

## Descripción General

Este proyecto implementa una **API REST desarrollada con Node.js y Express**, que permite **gestionar productos y carritos de compra**.  


## Tecnologías Utilizadas

- **Node.js** – entorno de ejecución JavaScript del lado del servidor  
- **Express.js** – framework para la creación de APIs REST  
- **File System (fs/promises)** – para la persistencia de datos en archivos `.json`  
- **Nodemon** (en desarrollo) – para ejecutar el servidor con recarga automática  

## Instalación y Ejecución

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/bcoriasco2025/Entrega1_BackendI
   cd mi-api

2. **Instalar dependencias**
   ```bash
      npm install

3. **El servidor estará disponible en**:

    http://localhost:8080

## Endpoints Principales

**Productos (/api/products)**

| Método     | Endpoint             | Descripción                      |
| ---------- | -------------------- | -------------------------------- |
| **GET**    | `/api/products`      | Listar todos los productos       |
| **GET**    | `/api/products/:pid` | Obtener un producto por su ID    |
| **POST**   | `/api/products`      | Crear un nuevo producto          |
| **PUT**    | `/api/products/:pid` | Actualizar un producto existente |
| **DELETE** | `/api/products/:pid` | Eliminar un producto existente   |

---

**Carritos (/api/carts)**

| Método     | Endpoint                      | Descripción                      |
| ---------- | ----------------------------  | -------------------------------- |
| **POST**   | `/api/carts`                  | Crear un nuevo carrito vacío     |
| **GET**    | `/api/carts/:cid`             | Obtener los productos de carrito |
| **POST**   | `/api/carts/:cid/product/:pid`| Agregar un producto al carrito   |

---








# Entrega2-Backend1
