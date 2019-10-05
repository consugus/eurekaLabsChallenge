# API-REST para la obtención de cotizacíon de acciones


Luego de descargar el proyecto, ejecutar la instalación de las dependencias del proyecto mediante el instalador de paquetes de Node:

```
> npm install
```
Dentro de la carpeta ./utils se encuentra el archivo de configuración de las peticiones para Postman *EurekaLabsChallenge.postman_collection.json*. Se recomienda importarlo desde Postman ya que con el mismo se suministran las peticiones ya configuradas, contemplando el token para poder probar la API:

![Postman](/images/postman.png)

Se creará una colección con las peticiones:

    * USERS
        * GET Users: retorna el listado de todos los usuarios cargados.
        * GET Users by Id: retorna un usuario dado un id
        * POST User: crea y agrega un usuario a la colección de usuarios
        * PUT User: actualiza la info del usuario, dado el Id del usuario. Todos los campos son obligatorios
        * DELETE User: elimina un usuario de la colección, dado el Id del usuario a eliminar
    * LOGIN
        * POST User: permite la verificación del usuario mediante email y password en la colección de usuarios registrados.
    * STOCKS
        * GET Stocks: devuelve la información sobre la cotización de las acciones para las empresas mencionadas (Facebook, Apple, MicroSoft, Google y Amazon)
[AlphaVantage](https://www.alphavantage.co/), de acuerdo a lo solicitado en el enunciado del Challenge


El enunciado del ejercicio no contempla la situación en la que la consulta por el precio de las acciones (o la comparación con el día previo) se realiza un sábado o domingo o algún feriado. Al respecto, se contempló devolver el mensaje "No se encontraron datos disponibles" en caso de que el día de la consulta o el previo sean sábado y/o domingo, a fin de que el error no produzca la detención en la ejecución.

