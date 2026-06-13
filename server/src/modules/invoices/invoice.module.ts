import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { invoiceProviders } from './invoice.providers';
import { InvoiceItemsModule } from '../invoice-items/invoice-items.module';
import { invoiceItemsProviders } from '../invoice-items/invoice-items.providers';
import { userAgentInvoiceProviders } from '../user-agent-invoices/user-agent-invoices.providers';
import { invoiceAnalyticsProviders } from '../invoice-analytics/invoice-analytics.provider';
import { EmailModule } from 'src/email/email.module';
import { invoiceSentsProviders } from '../invoice-sents/invoice-sents.provider';

@Module({
  providers: [
    InvoiceService,
    ...invoiceProviders,
    ...invoiceItemsProviders,
    ...userAgentInvoiceProviders,
    ...invoiceAnalyticsProviders,
    ...invoiceSentsProviders
  ],
  controllers: [InvoiceController],
  imports: [InvoiceItemsModule, EmailModule],
})
export class InvoiceModule {}
