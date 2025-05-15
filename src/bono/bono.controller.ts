import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { BonoService } from './bono.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { BonoDto } from './bono.dto';
import { BonoEntity } from './bono.entity';
import { plainToInstance } from 'class-transformer';

@Controller('bonos')
@UseInterceptors(BusinessErrorsInterceptor)
export class BonoController {
  constructor(private readonly bonoService: BonoService) {}

  @Post()
  async create(@Body() bonoDto: BonoDto) {
    const bono = plainToInstance(BonoEntity, bonoDto);
    return await this.bonoService.crearBono(bono);
  }

  @Get(':bonoId')
  async findBonoByCodigo(@Param('bonoId') bonoId: number) {
    const bono = await this.bonoService.findBonoByCodigo(bonoId);
    return bono;
  }

  @Delete(':bonoId')
  @HttpCode(204)
  async delete(@Param('bonoId') bonoId: number) {
    return await this.bonoService.deleteBono(bonoId);
  }
}
