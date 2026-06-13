import { Module , NestModule, MiddlewareConsumer  } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { InvoiceModule } from './modules/invoices/invoice.module';
import { InvoiceItemsModule } from './modules/invoice-items/invoice-items.module';
import { UserAgentMiddleware } from './user-agent/user-agent.middleware';
import { UserAgentInvoicesModule } from './modules/user-agent-invoices/user-agent-invoices.module';
import { MulterModule } from '@nestjs/platform-express';
import { UPLOAD_PATH } from './core/constants';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { InvoiceAnalyticsModule } from './modules/invoice-analytics/invoice-analytics.module';
import { EmailModule } from './email/email.module';
import { InvoiceSentsModule } from './modules/invoice-sents/invoice-sents.module';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EmailService } from './email/email.service';
import { MailerModule }  from '@nestjs-modules/mailer';
import * as path from 'path';
import {
  AcceptLanguageResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.EMAIL_ID,
          pass: process.env.EMAIL_PASS,
        },
      },
      template: {
        dir: join(__dirname, 'mails'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MulterModule.register({
      dest: UPLOAD_PATH,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    InvoiceModule,
    InvoiceItemsModule,
    UserAgentInvoicesModule,
    InvoiceAnalyticsModule,
    EmailModule,
    InvoiceSentsModule
  ],
  controllers: [AppController],
  providers: [AppService,EmailService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserAgentMiddleware)
      .forRoutes('invoice');
  }
}


