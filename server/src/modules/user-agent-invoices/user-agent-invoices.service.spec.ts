import { Test, TestingModule } from '@nestjs/testing';
import { UserAgentInvoicesService } from './user-agent-invoices.service';

describe('InvoiceItemsService', () => {
  let service: UserAgentInvoicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAgentInvoicesService],
    }).compile();

    service = module.get<UserAgentInvoicesService>(UserAgentInvoicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
