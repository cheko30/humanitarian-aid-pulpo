import { Test, TestingModule } from '@nestjs/testing';
import { MonetaryAidService } from './monetary_aid.service';

describe('MonetaryAidService', () => {
  let service: MonetaryAidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MonetaryAidService],
    }).compile();

    service = module.get<MonetaryAidService>(MonetaryAidService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
