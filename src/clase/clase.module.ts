import { Module } from '@nestjs/common';
import { ClaseService } from './clase.service';
import { ClaseEntity } from './clase.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ClaseService],
  imports: [TypeOrmModule.forFeature([ClaseEntity])],
})
export class ClaseModule {}
