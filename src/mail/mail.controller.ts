import { Controller, Get, Query } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('parse')
  async parseEmail(@Query('filePath') filePath: string): Promise<any> {
    return this.mailService.parseEmail(filePath);
  }
}
