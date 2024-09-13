# Tech Test - NestJs

Este proyecto es parte de una prueba técnica para un desarrollador de Nest.js. Se divide en dos partes: una prueba fácil y un verdadero desafío. El objetivo es trabajar con JSON y el procesamiento de correos electrónicos en formato .eml.

## Descripción General

## Prueba Fácil

1. Convertir un JSON dado en una clase.
2. Usar una librería de mapeo para convertir ese JSON en una estructura mapeada.
3. Crear un controlador con un endpoint que reciba el primer JSON y devuelva el segundo JSON mapeado.

## Verdadero Desafío

1. Procesar un archivo .eml que contenga un archivo adjunto o un enlace a un archivo JSON.
2. Crear un controlador que reciba la ruta del archivo .eml y extraiga el JSON, devolviéndolo como respuesta.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- Node.js v16 o superior
- npm (Node Package Manager)
- Nest.js CLI

## Estructura del Proyecto

El proyecto está desarrollado utilizando el framework **Nest.js** y contiene los siguientes módulos principales:

- **MailController**: Controlador encargado de recibir las solicitudes HTTP.
- **MailService**: Servicio que maneja la lógica de negocio relacionada con el procesamiento de correos electrónicos y la extracción de archivos JSON.
- **mail-parser**: Librería utilizada para parsear el contenido del correo electrónico y manejar sus adjuntos.
- **jsonMapperService**: Servicio responsable del mapeo de JSON en la primera prueba.

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

4. Asegúrate de tener un archivo `.eml` para probar, por ejemplo, `nestJs_dev.eml`. Este archivo debe estar ubicado en tu máquina con la ruta adecuada. El archivo .eml debe tener un archivo adjunto JSON o un enlace al JSON para pruebas efectivas

## Ejecución del Proyecto

Para ejecutar el servidor de Nest.js, utiliza el siguiente comando:

```bash
npm run start
```

El servidor estará disponible en <http://localhost:3000>.

## Mail Parser Challenge [Verdadero Desafío]

### Descripción

Este proyecto es parte de una prueba técnica para un desarrollador de Nest.js. El objetivo principal es crear un backend que permita procesar correos electrónicos en formato `.eml`, extraer archivos adjuntos de tipo JSON o enlaces que contengan o apunten a un archivo JSON, y devolver su contenido.

### Endpoints

``` bash
GET /mail/parse
```

Este endpoint permite procesar un archivo .eml que contiene un correo electrónico con adjuntos o enlaces que contienen JSON.

### Parámetros

```bash
filePath: La ruta del archivo .eml que se quiere procesar.
```

### Ejemplo de Solicitud

```bash
GET http://localhost:3000/mail/parse?filePath=/ruta/completa/al/archivo/nestJs_dev.eml
```

### Funcionamiento

El servicio **MailService** analiza el contenido del correo electrónico y extrae el archivo JSON en los siguientes casos:

1. Si el archivo JSON está adjunto en el correo, el contenido se devuelve como respuesta.
2. Si no hay un archivo adjunto, el servicio buscará enlaces en el cuerpo del correo que apunten a un archivo JSON.
3. Si el enlace encontrado lleva a una página HTML, el servicio buscará dentro de esa página un enlace que finalmente apunte a un archivo JSON.

En caso de no encontrar un archivo JSON en ninguna de las ubicaciones mencionadas, el servicio devolverá el siguiente mensaje:

```json
{
  "message": "No JSON found"
}
```

**Importante: Asegúrate de que el archivo .eml contiene al menos un archivo JSON adjunto o un enlace al JSON, ya que de lo contrario la respuesta indicará que no se encontró ningún JSON.**

### Dependencias Principales

Este proyecto utiliza las siguientes dependencias principales:

- **mailparser**: Para procesar el contenido de los correos electrónicos.
- **node-fetch**: Para hacer peticiones HTTP y descargar contenido desde URLs.
- **fs**: Para la lectura de archivos del sistema.

## Prueba Fácil: Mapeo de JSON

### Endpoint

```bash
POST /json/convert
```

Este endpoint permite convertir un JSON recibido en el cuerpo de la solicitud a una estructura mapeada según las reglas definidas.

### Ejemplo de Solicitud

```bash
POST http://localhost:3000/json/convert
```

### Ejemplo de Cuerpo de la Solicitud

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

### Ejemplo de Respuesta

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

### Descripción del mapeo

El JSON de salida se crea a partir de los siguientes valores del JSON original:

- spam: Basado en `spamVerdict.status`, si es "PASS", el valor será `true`.
- virus: Basado en `virusVerdict.status`, si es "PASS", el valor será `true`.
- dns: Solo será `true` si `spfVerdict.status`, `dkimVerdict.status` y `dmarcVerdict.status` son "PASS".
- mes: Convertido de `mail.timestamp` a nombre del mes (por ejemplo, "September").
- retrasado: Será `true` si `processingTimeMillis` es mayor a 1000.
- emisor: El nombre de usuario antes del símbolo @ de `mail.source`.
- receptor: Una lista con los nombres de usuario antes del símbolo @ de cada uno de los correos en `mail.destination`.
