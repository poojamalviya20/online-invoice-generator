import { UserAgentInvoices } from './user-agent-invoices.entity';
import { USER_AGENT_INVOICES_REPOSITORY } from '../../core/constants';

export const userAgentInvoiceProviders = [
  {
    provide: USER_AGENT_INVOICES_REPOSITORY,
    useValue: UserAgentInvoices,
  }
];
