import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceSentsService } from './invoice-sents.service';

describe('InvoiceItemsService', () => {
  let service: InvoiceSentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceSentsService],
    }).compile();

    service = module.get<InvoiceSentsService>(InvoiceSentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

