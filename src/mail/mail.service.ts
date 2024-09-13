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
        jsonAttachment = jsonFile.content.toString();
      }
    }

    // Si el JSON esta en el cuerpo del correo o en un enlace
    if (!jsonAttachment && parsed.text) {
      // Extrac link
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const matches = parsed.text.match(urlRegex);

      if (matches && matches.length > 0) {
        const cleanUrl = matches[0].replace(/[>*]/g, ''); // Elimina caracteres extraños
        console.log('🚀 Fetching JSON from:', cleanUrl);

        try {
          const response = await fetch(cleanUrl);

          // Verificamos si el content-type es JSON
          const contentType = response.headers.get('content-type');

          if (
            response.ok &&
            contentType &&
            contentType.includes('application/json')
          ) {
            jsonAttachment = await response.json();
          } else {
            throw new Error(
              `Invalid content-type: ${contentType}. Expected application/json.`,
            );
          }
        } catch (error) {
          console.error('Error fetching JSON from URL:', error);
        }
      }
    }

    return jsonAttachment
      ? JSON.parse(jsonAttachment)
      : { message: 'No JSON found' };
  }
}
