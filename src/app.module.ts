import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailController } from './mail/mail.controller';
import { MailService } from './mail/mail.service';
import { JsonController } from './json/json.controller';
import { JsonService } from './json/json.service';
import { JsonModule } from './json/json.module';

@Module({
  imports: [JsonModule],
  controllers: [AppController, MailController, JsonController],
  providers: [AppService, MailService, JsonService],
})
export class AppModule {}
