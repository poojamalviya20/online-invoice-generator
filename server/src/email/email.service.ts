import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendUserWelcome(user_email: any, filename: any) {
    const newPdfFile = filename.pdffile;
    await this.mailerService
      .sendMail({
        to: user_email,
        from: process.env.EMAIL_ID,
        subject: 'Invoice PDF file',
        template: 'invoice',
        context: {
          filename:newPdfFile
        },
      })
      .then((data) => {
        return {
          msg: 'mail send.',
        };
      })
      .catch((err) => {
        console.log('err', err);
      });
  }
}
