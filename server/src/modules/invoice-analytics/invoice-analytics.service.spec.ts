import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceAnalyticsService } from './invoice-analytics.service';

describe('InvoiceItemsService', () => {
  let service: InvoiceAnalyticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceAnalyticsService],
    }).compile();

    service = module.get<InvoiceAnalyticsService>(InvoiceAnalyticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
