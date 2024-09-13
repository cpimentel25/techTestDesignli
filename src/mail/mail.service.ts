import { Injectable } from '@nestjs/common';
import { simpleParser } from 'mailparser';
import * as fs from 'fs';

@Injectable()
export class MailService {
  async parseEmail(filePath: string): Promise<any> {
    const emailContent = fs.readFileSync(filePath);
    const parsed = await simpleParser(emailContent);

    let jsonAttachment = null;

    // Verificar si hay archivos adjuntos
    if (parsed.attachments && parsed.attachments.length > 0) {
      const jsonFile = parsed.attachments.find(
        (attachment) => attachment.contentType === 'application/json',
      );
      if (jsonFile) {
        try {
          jsonAttachment = JSON.parse(jsonFile.content.toString());
        } catch (error) {
          console.error('Error parsing JSON from attachment:', error);
        }
      }
    }

    // Buscar enlace en el cuerpo del correo
    if (!jsonAttachment && parsed.text) {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const matches = parsed.text.match(urlRegex);

      if (matches && matches.length > 0) {
        for (const url of matches) {
          try {
            const cleanUrl = url.replace(/[>*]/g, ''); // Eliminar caracteres extraños

            // Verificar si el enlace es un archivo JSON directo
            let response = await fetch(cleanUrl);
            let contentType = response.headers.get('content-type');
            if (
              response.ok &&
              contentType &&
              contentType.includes('application/json')
            ) {
              try {
                jsonAttachment = await response.json();
                break; // Salimos del bucle si encontramos el JSON
              } catch (error) {
                console.error('Error parsing JSON from URL:', error);
              }
            } else {
              // Si no es JSON, verificar si es una pagina con un enlace al JSON
              const pageContent = await response.text();
              const jsonLinkMatches = pageContent.match(urlRegex);

              if (jsonLinkMatches) {
                for (const jsonLink of jsonLinkMatches) {
                  try {
                    response = await fetch(jsonLink);
                    contentType = response.headers.get('content-type');

                    if (
                      response.ok &&
                      contentType &&
                      contentType.includes('application/json')
                    ) {
                      try {
                        jsonAttachment = await response.json();
                        break; // Salimos del bucle si encontramos el JSON
                      } catch (error) {
                        console.error(
                          'Error parsing JSON from linked URL:',
                          error,
                        );
                      }
                    }
                  } catch (error) {
                    console.error(
                      'Error fetching JSON from linked URL:',
                      error,
                    );
                  }
                }
              }
            }
          } catch (error) {
            console.error('Error fetching JSON from URL:', error);
          }
        }
      }
    }

    return jsonAttachment || { message: 'No JSON found' };
  }
}
