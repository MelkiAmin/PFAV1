import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
    async sendEmail(to: string, subject: string, text: string): Promise<string> {
    // Use your real SMTP credentials here
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'YOUR_ETHEREAL_USER',
        pass: 'YOUR_ETHEREAL_PASS',
      },
    });

    const info = await transporter.sendMail({
      from: '"Test" <test@example.com>',
      to,
      subject,
      text,
    });

    return `Email sent: ${info.messageId}`;
  }
}
