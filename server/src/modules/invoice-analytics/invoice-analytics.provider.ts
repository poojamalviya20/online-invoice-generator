import { InvoiceAnalytics } from './invoice-analytics.entity'; 
import { INVOICE_ANALYTICS_REPOSITORY } from '../../core/constants';

export const invoiceAnalyticsProviders = [
    {
        provide: INVOICE_ANALYTICS_REPOSITORY,
        useValue: InvoiceAnalytics,
    },
];
