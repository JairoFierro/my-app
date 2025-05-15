import { Module } from '@nestjs/common';
import { BonoService } from './bono.service';
import { BonoController } from './bono.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BonoEntity } from './bono.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BonoEntity])],
  providers: [BonoService],
  controllers: [BonoController],
})
export class BonoModule {}
