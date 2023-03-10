import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponsibleAgencies } from './entities/responsible_agencies.entity';
import { MonetaryAidController } from './monetary_aid.controller';
import { MonetaryAidService } from './services/monetary_aid.service';
import { ResponsibleAgenciesService } from './services/responsible-agencies.service';

@Module({
  imports: [
    MonetaryAidModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([ResponsibleAgencies]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'humanitarian_aid_pulpo',
      entities: [ResponsibleAgencies],
      synchronize: true,
    }),
  ],
  exports: [TypeOrmModule],
  controllers: [MonetaryAidController],
  providers: [MonetaryAidService, ResponsibleAgenciesService],
})
export class MonetaryAidModule {}
