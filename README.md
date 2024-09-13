# Mail Parser Challenge

## Descripción

Este proyecto es parte de una prueba técnica para un desarrollador de Nest.js. El objetivo principal es crear un backend que permita procesar correos electrónicos en formato `.eml`, extraer archivos adjuntos de tipo JSON o enlaces que contengan o apunten a un archivo JSON, y devolver su contenido.

## Estructura del Proyecto

El proyecto está desarrollado utilizando el framework **Nest.js** y contiene los siguientes módulos principales:

- **MailController**: Controlador encargado de recibir las solicitudes HTTP.
- **MailService**: Servicio que maneja la lógica de negocio relacionada con el procesamiento de correos electrónicos y la extracción de archivos JSON.
- **mail-parser**: Librería utilizada para parsear el contenido del correo electrónico y manejar sus adjuntos.

## Requisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- Node.js v16 o superior
- npm (Node Package Manager)
- Nest.js CLI

### Dependencias

Este proyecto utiliza las siguientes dependencias principales:

- **mailparser**: Para procesar el contenido de los correos electrónicos.
- **node-fetch**: Para hacer peticiones HTTP y descargar contenido desde URLs.
- **fs**: Para la lectura de archivos del sistema.

## Instalación

Para instalar y configurar el proyecto, sigue los siguientes pasos:

1. Clonar el repositorio:

    ```bash
    git clone <URL_DEL_REPOSITORIO>
    ```

2. Navega al directorio del proyecto:

    ```bash
    cd mail-parser-challenge
    ```

3. Instalar las dependencias:

    ```bash
    npm install
    ```

4. Asegúrate de tener un archivo `.eml` para probar, por ejemplo, `nestJs_dev.eml`. Este archivo debe estar ubicado en tu máquina con la ruta adecuada.

## Ejecución del Proyecto

Para ejecutar el servidor de Nest.js, utiliza el siguiente comando:

```bash
npm run start
```

El servidor estará disponible en <http://localhost:3000>.

## Endpoints

``` POST /mail/parse
```

Este endpoint permite procesar un archivo .eml que contiene un correo electrónico con adjuntos o enlaces que contienen JSON.

### Parámetros

```filePath:
La ruta del archivo .eml que se quiere procesar.
```

Ejemplo de solicitud

```bash
POST http://localhost:3000/mail/parse?filePath=/ruta/completa/al/archivo/nestJs_dev.eml
```

Ejemplo de solicitud

```json
{
    "title": "Sample Title",
    "description": "This is a sample description with random content.",
    "content": [
        "First paragraph of random content.",
        "Second paragraph of random content.",
        "Third paragraph of random content."
    ],
    "author": "Random Author",
    "published": true,
    "date": "2024-09-12"
}
```
