import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponsibleAgencies } from '../entities/responsible_agencies.entity';

@Injectable()
export class ResponsibleAgenciesService {
  constructor(
    @InjectRepository(ResponsibleAgencies)
    private responsibleAgenciesRepository: Repository<ResponsibleAgencies>,
  ) {}

  async findOne(code: string): Promise<ResponsibleAgencies> {
    const result = await this.responsibleAgenciesRepository.findOneBy({ code });
    return result;
  }

  async findAll(): Promise<ResponsibleAgencies[]> {
    const result = await this.responsibleAgenciesRepository.find();
    return result;
  }
}
