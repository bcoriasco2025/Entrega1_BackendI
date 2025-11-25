# Entrega n°2 - Websockets

## Descripción General

Este proyecto implementa una **Agregar un sistema visual con Handlebars y actualización en tiempo real usando WebSockets (Socket.IO).** 


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

4. **Endpoints Disponibles**

*Vistas*

| Método | Ruta              | Descripción                          |
| ------ | ----------------- | ------------------------------------ |
| GET    | /                 | Muestra la lista de productos (home) |
| GET    | /realtimeproducts | Muestra los productos en tiempo real |


5. **Productos (HTTP)**

| Método | Ruta          | Descripción                |
| ------ | ------------- | -------------------------- |
| GET    | /products     | Lista todos los productos  |
| POST   | /products     | Crea un nuevo producto     |
| DELETE | /products/:id | Elimina un producto por ID |


6. **Consideraciones Generales**

En la vista realTimeProducts, **la creación y eliminación de productos puede realizarse mediante un formulario que utiliza WebSockets.** Cada cambio se refleja automáticamente en la lista sin necesidad de recargar la página.