import { Module } from '@nestjs/common';
import { MonetaryAidController } from './monetary_aid.controller';
import { MonetaryAidService } from './monetary_aid.service';

@Module({
  controllers: [MonetaryAidController],
  providers: [MonetaryAidService],
})
export class MonetaryAidModule {}
