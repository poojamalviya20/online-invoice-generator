import { Module } from '@nestjs/common';
import { InvoiceSentsService } from './invoice-sents.service';

@Module({
    providers:[InvoiceSentsService]
})
export class InvoiceSentsModule {}
