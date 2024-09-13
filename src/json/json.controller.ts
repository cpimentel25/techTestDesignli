import { Body, Controller, Post } from '@nestjs/common';
import { JsonService } from './json.service';
import { MappedJsonDto } from './dto/json.dto';

@Controller('json')
export class JsonController {
  constructor(private readonly jsonService: JsonService) {}

  @Post('convert')
  converJson(@Body() json: any): MappedJsonDto {
    return this.jsonService.convertJsonToMappedClass(json);
  }
}
