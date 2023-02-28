const Clientes = require('../models/Clientes.js');

//  Agrega nuevo cliente

exports.nuevoCliente = async (req, res, next) => {

    // console.log(req.body);
   const cliente = new Clientes(req.body);

   try {
    // Almacenar el registro
    await cliente.save();
    res.json({mensaje: 'Se agrego un nuevo cliente'});
   } catch (error) {
    // Si hay un error, console.log y next 
    res.send(error)
    next();
   }
}

//  Muestra todos los clientes
exports.mostrarClientes = async (req, res, next) => {

    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
    } catch (error) {
        console.log(error);
        next();
    }
}

//  Muestra el cliente por Id
exports.mostrarCliente = async (req, res, next) => {
    const cliente = await Clientes.findById(req.params.idCliente);
    if (!cliente) {
        res.json({mensaje: 'Oppss, el cliente no existe'})
        next();
    }

    // Mostrar cliente 
    res.json(cliente);
}

// Actualiza el cliente por su Id
exports.actualizarCliente = async (req, res, next) => {
    try {
        const cliente = await Clientes.findOneAndUpdate({_id:req.params.idCliente}, 
            req.body, {
                new : true
            });
            res.json(cliente)
    } catch (error) {
        res.send(error)
        next();
    }
}

// Eliminar cliente por Id
exports.eliminarCliente = async (req, res, next) => {
    try {
        await Clientes.findOneAndDelete({_id:req.params.idCliente}); 
            res.json({mensaje: 'El cliente se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}
