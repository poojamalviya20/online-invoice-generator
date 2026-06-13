import { IsNotEmpty, MinLength } from 'class-validator';
import { UUID } from 'crypto';

export class InvoiceAnalyticsDto {
   readonly uuid : UUID;
   readonly invoice_id : number;
   readonly download_count: number;
   readonly sent_over_mail_count : number;
}
