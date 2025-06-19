import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('send-email')
  async sendEmail(
    @Body() body: { to: string; subject: string; text: string }
  ): Promise<string> {
    return this.appService.sendEmail(body.to, body.subject, body.text);
  }
}
