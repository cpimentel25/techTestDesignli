import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { JsonDto } from './dto/json.dto';

@Injectable()
export class JsonService {
  convertJsonToClass(json: any): JsonDto {
    return plainToClass(JsonDto, json);
  }
}
