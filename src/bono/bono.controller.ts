import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
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
}
