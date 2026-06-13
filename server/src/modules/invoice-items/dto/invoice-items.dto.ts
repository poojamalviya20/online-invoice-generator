import { IsNotEmpty, MinLength } from 'class-validator';
import { UUID } from 'crypto';

export class InvoiceItemDto {

   readonly uuid : UUID;
   readonly invoice_id : string;
   readonly product_name: string;
   readonly quantity : number;
   readonly rate_amount : number;
   readonly total_amount : number;
}
