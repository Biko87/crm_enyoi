const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController.js');
const productosController = require('../controllers/productosController.js');
const pedidosController = require('../controllers/pedidosController.js');
const usuariosController = require('../controllers/usuariosController');

// middle para proteger las rutas
const auth = require('../middleware/auth');

module.exports = function () {
    // Agrega Nuevos clientes via POST
    router.post('/clientes', 
    auth,
    clienteController.nuevoCliente)

    // Obtener todos los clientes
    router.get('/clientes', 
    auth,
    clienteController.mostrarClientes);

    // Muestra el cliente por Id
    router.get('/clientes/:idCliente', 
    auth,
    clienteController.mostrarCliente);

    // Actualizar cliente
    router.put('/clientes/:idCliente', 
    auth,
    clienteController.actualizarCliente);

    // Eliminar Cliente
    router.delete('/clientes/:idCliente', 
    auth,
    clienteController.eliminarCliente);

    /** PRODUCTOS **/

    // Nuevos Productos 
    router.post('/productos', 
    auth,
    productosController.subirArchivo,
    productosController.nuevoProducto);

     // Muestra el cliente por Id
     router.get('/productos',  
     auth,
     productosController.mostrarProductos);

     // Muestra producto por Id
     router.get('/productos/:idProducto',  
     auth,
     productosController.mostrarProducto);

     // Actualizar producto por Id
     router.put('/productos/:idProducto', 
     auth, 
     productosController.subirArchivo,
     productosController.actualizarProducto);

     // Eliminar Producto
    router.delete('/productos/:idProducto', 
    auth,
    productosController.eliminarProducto);

    // Búsqueda de Productos 
    router.post('/productos/busqueda/:query',  
    auth,
    productosController.buscarProducto);

    /** PEDIDOS **/
    // Agregar Nuevos Pedidos
    router.post('/pedidos/nuevo/:idUsuario',  
    auth,
    pedidosController.nuevoPedido);

    // Mostrar todos los pedidos
    router.get('/pedidos',  
    auth,
    pedidosController.mostrarPedidos);

    // Mostrar pedido por Id
    router.get('/pedidos/:idPedido',  
    auth,
    pedidosController.mostrarPedido);

    // Actualizar pedido 
    router.put('/pedidos/:idPedido',  
    auth,
    pedidosController.actualizarPedido);

    // Eliminar pedido 
    router.delete('/pedidos/:idPedido', 
    auth,
    pedidosController.eliminarPedido);

        // Usuarios
    router.post('/crear-cuenta', 
    auth,
    usuariosController.registrarUsuario
    );

    router.post('/iniciar-sesion', usuariosController.autenticarUsuario);

    return router;
}