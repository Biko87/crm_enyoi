const Pedidos = require('../models/Pedidos.js');

exports.nuevoPedido = async (req, res, next) => {
    const pedido = new Pedidos(req.body);
    try {
        // Almacenar el registro
        await pedido.save();
        res.json({mensaje: 'Se agrego un nuevo pedido'});
       } catch (error) {
        // Si hay un error, console.log y next 
        console.log(error)
        next();
       }
}

// Muestra todos los pedidos
exports.mostrarPedidos = async (req, res, next) => {

    try {
        // Almacenar el registro
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });
        res.json(pedidos);
       } catch (error) {
        // Si hay un error, console.log y next 
        console.log(error)
        next();
       }
}

// Mostrar Pedido por Id
exports.mostrarPedido = async (req, res, next) => {
    const pedido = await Pedidos.findById(req.params.idPedido).populate('cliente').populate({
        path: 'pedido.producto',
        model: 'Productos'
    });

    if (!pedido) {
        res.json({mensaje: 'Oppss, Ese pedido no existe'});
        return next();
    }

    // Mostrar Pedido 
    res.json(pedido);
}

    // Actualizar Pedido
    exports.actualizarPedido = async (req, res, next) => {

        try {
            let pedido =  await Pedidos.findOneAndUpdate({_id: req.params.idPedido}, req.body, {
              new: true
            }).populate('cliente').populate({
                path: 'pedido.producto',
                model: 'Productos'
            });
            res.json(pedido);
        } catch (error) {
            console.log(error);
            next();
        }

}

// Elimina un producto via ID
exports.eliminarPedido = async (req, res, next) => {
    const { idPedido } = req.params;

    try {
        // Construir un nuevo producto
        let nuevoProducto = req.body;

        // Verificar si hay imagen nueva
        if (req.file) {
            nuevoProducto.imagen = req.file.filename;
        } else {
            let productoAnterior = await Productos.findById(idProducto);
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        let producto = await Productos.findOneAndUpdate({ _id: idProducto },
            nuevoProducto, {
            new: true
        });

        res.json({
            producto,
            mensaje: 'Producto actualizado',
            status: 200
        });
    } catch (error) {
        console.log(error);
        next();
    }
}

// Elimina un producto via ID
exports.eliminarPedido = async (req, res, next) => {
    try {    
        await Pedidos.findByIdAndDelete({ _id: req.params.idPedido });
        res.json({ mensaje: 'El pedido se ha eliminado' });
    } catch (error) {
        console.log(error);
        next();
    }

}