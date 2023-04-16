1- Instalar las dependencias en las carpetas "back" y"client"
2- Agregar el archivo .env en la carpeta "back" con los siguientes datos:

    PORT=8080
    MONGO_PATH = "ruta de acceso a mongodb"
    CREDENTIAL_PATH = "ruta de acceso al archivo de firebase que se guarda en la carpeta firebase"

    EMAIL_SERVICE = "hotmail"
    EMAIL_USER = "direccion que recibirá los mails enviados al registrar un usuario o comprar un carrito"
    EMAIL_PASS = "password de ese mail" (recomiendo usar las password generadas para aplicaciones en hotmail)

    # JWT
    JWT_SECRET_KEY=secret
    JWT_TIME_EXPIRE_HOURS=1

3- Iniciar el proyecto con "npm start" en las carpetas back y client.

4- Los usuarios registrados no son admin, si se quiere probar un usuario admin se puede registrar un usuario
y en la base de datos de mongo hardcodear el parametro admin a "true"
