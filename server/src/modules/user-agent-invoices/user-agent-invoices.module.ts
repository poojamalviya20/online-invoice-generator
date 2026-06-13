import { Module } from '@nestjs/common';
import { UserAgentInvoicesService } from './user-agent-invoices.service';

@Module({
  providers: [UserAgentInvoicesService],
})
export class UserAgentInvoicesModule {}
