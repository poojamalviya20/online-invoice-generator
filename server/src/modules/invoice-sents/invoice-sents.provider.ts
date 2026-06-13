import { InvoiceSents } from './invoice-sents.entity';
import { INVOICE_SENTS_REPOSITORY } from '../../core/constants';

export const invoiceSentsProviders = [
    {
        provide: INVOICE_SENTS_REPOSITORY,
        useValue: InvoiceSents,
    },
];
