import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { createTransport } from "nodemailer";
import Mail from "nodemailer/lib/mailer";

@Injectable()
export class EmailService {
  private nodemailerTransport: Mail;

  constructor(
    private readonly configService: ConfigService
  ) {
    const emailService = configService.get<string>('EMAIL_SERVICE');
    const emailHost = configService.get<string>('EMAIL_HOST');
    const emailPort = configService.get<number>('EMAIL_PORT');
    
    interface TransportOptions {
      service?: string;
      host?: string;
      port?: number;
      secure?: boolean;
      auth: {
        user?: string;
        pass?: string;
      };
    }

    const transportOptions: TransportOptions = {
      auth: {
        user: configService.get<string>('EMAIL_USER'),
        pass: configService.get<string>('EMAIL_PASSWORD'),
      }
    };

    if (emailService) {
      transportOptions.service = emailService;
    } else if (emailHost) {
      transportOptions.host = emailHost;
      transportOptions.port = emailPort ?? 587;
      transportOptions.secure = emailPort === 465;
    }

    this.nodemailerTransport = createTransport(transportOptions);
  }

  sendMail(options: Mail.Options) {
    return this.nodemailerTransport.sendMail(options);
  }
}
