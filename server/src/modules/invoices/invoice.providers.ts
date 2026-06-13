import { Invoice } from './invoice.entity';
import { INVOICE_REPOSITORY } from '../../core/constants';

export const invoiceProviders = [
    {
        provide: INVOICE_REPOSITORY,
        useValue: Invoice,
    },
];
