import { Module } from '@nestjs/common';
import { InvoiceAnalyticsService } from './invoice-analytics.service';

@Module({
    providers:[InvoiceAnalyticsService]
})
export class InvoiceAnalyticsModule {}
