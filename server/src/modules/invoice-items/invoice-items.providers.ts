import { InvoiceItems } from './invoice-items.entity'; 
import { INVOICE_ITEM_REPOSITORY } from '../../core/constants';

export const invoiceItemsProviders = [
    {
        provide: INVOICE_ITEM_REPOSITORY,
        useValue: InvoiceItems,
    },
];
