import { Module } from '@nestjs/common';
import { InvoiceItemsService } from './invoice-items.service';

@Module({
  providers: [InvoiceItemsService]
})
export class InvoiceItemsModule {}
