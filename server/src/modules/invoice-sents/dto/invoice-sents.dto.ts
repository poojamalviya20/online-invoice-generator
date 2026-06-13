import { IsNotEmpty, MinLength } from 'class-validator';
import { UUID } from 'crypto';

export class InvoiceSentDto {
   readonly uuid : UUID;
   readonly invoice_id : number;
   readonly email: string;
   readonly attachment : string;
}
