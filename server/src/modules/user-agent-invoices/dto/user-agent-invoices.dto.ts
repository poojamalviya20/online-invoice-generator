import { UUID } from 'crypto';

export class UserAgentInvoicesDto {
   readonly uuid : UUID;
   readonly user_agent_id : number;
   readonly invoice_id: number;
}
