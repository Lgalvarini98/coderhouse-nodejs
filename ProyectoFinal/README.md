1- Instalar las dependencias en las carpetas "back" y"client"
2- Agregar el archivo .env en la carpeta "back" con los siguientes datos:

    PORT=8080
    MONGO_PATH = "ruta de acceso a mongodb"
    CREDENTIAL_PATH = "../firebase/ecommercech-57b78-firebase-adminsdk-35rpz-2809b9ad85.json"

    EMAIL_SERVICE = "hotmail"
    EMAIL_USER = "direccion que recibirá los mails enviados al registrar un usuario o comprar un carrito"
    EMAIL_PASS = "password de ese mail" (recomiendo usar las password generadas para aplicaciones en hotmail)

    # JWT
    JWT_SECRET_KEY=secret
    JWT_TIME_EXPIRE_HOURS=1

3- Iniciar el proyecto con "npm start" en las carpetas back y client.

4- Los usuarios registrados no son admin, si se quiere probar un usuario admin se puede registrar un usuario
    y en la base de datos de mongo hardcodear el parametro admin a "true" o pueden loguear con este usuario ya creado en mi base de datos:

    email: coderhouse@gmail.com
    password: coderhouse

5- RUTAS:

    Ruta base: http://localhost:8080/api

      Autenticación:

        + /login --> ruta para iniciar sesion --> GET
        + /register --> ruta para registrarse --> POST

      Productos:

        + /productos --> ruta para obtener todos los productos --> GET
        + /productos/:codigo --> ruta para obtener un producto por codigo de producto --> GET
        + /productos --> ruta para crear un producto --> POST
        + /productos/:id --> ruta para actualizar un producto --> PUT
        + /productos/categorias --> ruta para obtener todas las categorias de productos --> GET
        + /productos/categoria/:categoria --> ruta para obtener todos los productos de una categoria --> GET
        + /productos/:id --> ruta para eliminar un producto --> DELETE

      Carrito:

        + /carrito/:id --> ruta para obtener un carrito por id de carrito --> GET
        + /carrito --> ruta para crear un carrito --> POST
        + /carrito/:id/productos --> ruta para agregar un producto al carrito --> POST
        + /carrito/:id --> ruta para eliminar un carrito --> DELETE
        + /carrito/:id --> ruta para comprar un carrito --> POST
        + /carrito/:id/productos/:id_prod --> ruta para eliminar un producto del carrito --> DELETE