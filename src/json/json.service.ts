import { Injectable } from '@nestjs/common';
import { MappedJsonDto } from './dto/json.dto';
import * as dayjs from 'dayjs';

@Injectable()
export class JsonService {
  convertJsonToMappedClass(json: any): MappedJsonDto {
    // Accedemos al primer registro, asumiendo que siempre existe al menos uno
    const record = json.Records[0];

    // Extraemos información relevante del JSON original
    const spam = record.ses.receipt.spamVerdict.status === 'PASS';
    const virus = record.ses.receipt.virusVerdict.status === 'PASS';
    const dns =
      record.ses.receipt.spfVerdict.status === 'PASS' &&
      record.ses.receipt.dkimVerdict.status === 'PASS' &&
      record.ses.receipt.dmarcVerdict.status === 'PASS';

    const mailTimestamp = record.ses.mail.timestamp;
    // Usamos dayjs para obtener el mes como texto
    const mes = dayjs(mailTimestamp).format('MMMM');

    const retrasado = record.ses.receipt.processingTimeMillis > 1000;

    // Obtenemos el nombre de usuario sin el dominio
    const emisor = record.ses.mail.source.split('@')[0];

    // Lista de usuarios sin dominio
    const receptor = record.ses.mail.destination.map(
      (email: string) => email.split('@')[0],
    );

    // Nos retorna la nueva estructura mapeada
    return {
      spam,
      virus,
      dns,
      mes,
      retrasado,
      emisor,
      receptor,
    };
  }
}
