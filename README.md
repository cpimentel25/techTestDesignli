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

``` bash
POST /mail/parse
```

Este endpoint permite procesar un archivo .eml que contiene un correo electrónico con adjuntos o enlaces que contienen JSON.

### Parámetros

```bash
filePath: La ruta del archivo .eml que se quiere procesar.
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

# JSON Conversion Endpoint

```bash
POST /json/convert
```

Este endpoint permite convertir un JSON recibido en el cuerpo de la solicitud a una estructura mapeada según las reglas definidas.

## Cuerpo de la Solicitud

```json
{
  "Records": [
    {
      "ses": {
        "receipt": {
          "spamVerdict": { "status": "PASS" },
          "virusVerdict": { "status": "PASS" },
          "spfVerdict": { "status": "PASS" },
          "dkimVerdict": { "status": "PASS" },
          "dmarcVerdict": { "status": "PASS" },
          "processingTimeMillis": 500
        },
        "mail": {
          "timestamp": "2023-09-12T12:34:56.000Z",
          "source": "user@example.com",
          "destination": ["recipient@example.com"]
        }
      }
    }
  ]
}

```

## Ejemplo de Solicitud

```bash
POST http://localhost:3000/json/convert
```

## Ejemplo de Respuesta

```json
{
  "spam": true,
  "virus": true,
  "dns": true,
  "mes": "September",
  "retrasado": false,
  "emisor": "user",
  "receptor": ["recipient"]
}
```

## Descripción del mapeo

El JSON de salida se crea a partir de los siguientes valores del JSON original:

- spam: Basado en spamVerdict.status, si es "PASS", el valor será true.
- virus: Basado en virusVerdict.status, si es "PASS", el valor será true.
- dns: Solo será true si spfVerdict.status, dkimVerdict.status y dmarcVerdict.status son "PASS".
- mes: Convertido de mail.timestamp a nombre del mes (por ejemplo, "September").
- retrasado: Será true si processingTimeMillis es mayor a 1000.
- emisor: El nombre de usuario antes del símbolo @ de mail.source.
- receptor: Una lista con los nombres de usuario antes del símbolo @ de cada uno de los correos en mail.destination.
