import { IsNotEmpty, MinLength, IsString, IsDate, IsNumber, IsEmpty } from 'class-validator';
import { UUID } from 'crypto';

export class InvoiceDto {

   readonly uuid : UUID;

   readonly invoice_number : string;

   readonly invoice_from : string;

   readonly password: string;
   
   readonly date : Date;

   readonly due_date : Date;

   readonly payment_terms : string;

   readonly po_number : string;

   readonly billing_to_name : string;
   
   readonly billing_address : string;

   readonly shipping_to_name : string;

   readonly shipping_address : string;

   readonly notes : string;

   readonly terms : string;

   readonly subtotal : number;

   readonly currency_code : string;

   readonly discount : number;

   readonly discount_option : string;

   readonly tax: number;

   readonly tax_option : string;

   readonly shipping_charge : number;

   readonly total_amount : number;

   readonly  paid_amount : number;

   readonly  due_amount : number;
}
