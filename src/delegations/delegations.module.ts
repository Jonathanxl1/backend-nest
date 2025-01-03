import { Module } from '@nestjs/common';
import { DelegationsService } from './delegations.service';
import { DelegationsController } from './delegations.controller';

@Module({
  controllers: [DelegationsController],
  providers: [DelegationsService],
})
export class DelegationsModule {}
