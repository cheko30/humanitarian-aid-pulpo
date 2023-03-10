import { Test, TestingModule } from '@nestjs/testing';
import { ResponsibleAgenciesService } from './responsible-agencies.service';

describe('ResponsibleAgenciesServiceService', () => {
  let service: ResponsibleAgenciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponsibleAgenciesService],
    }).compile();

    service = module.get<ResponsibleAgenciesService>(
      ResponsibleAgenciesService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
