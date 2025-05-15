import { Injectable } from '@nestjs/common';
import { BonoEntity } from './bono.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BussinessError,
  BussinessLogicException,
} from '../shared/errors/business-errors';

@Injectable()
export class BonoService {
  constructor(
    @InjectRepository(BonoEntity)
    private readonly bonoRepository: Repository<BonoEntity>,
  ) {}

  async crearBono(newBono: BonoEntity): Promise<BonoEntity> {
    if (newBono.monto == null) {
      throw new BussinessLogicException(
        'El monto no puede ser vacío',
        BussinessError.PRECONDITION_FAILED,
      );
    }

    if (newBono.monto <= 0) {
      throw new BussinessLogicException(
        'El monto no puede ser negativo',
        BussinessError.PRECONDITION_FAILED,
      );
    }

    if (newBono.usuario.rol !== 'Profesor') {
      throw new BussinessLogicException(
        'Debes ser un profesor para crear un bono',
        BussinessError.PRECONDITION_FAILED,
      );
    }
    const bono = this.bonoRepository.save(newBono);
    return bono;
  }

  async findBonoByCodigo(id: number): Promise<BonoEntity> {
    const bono = await this.bonoRepository.findOne({
      where: { id },
    });
    if (!bono)
      throw new BussinessLogicException(
        'El bono con el codigo dado no existe',
        BussinessError.NOT_FOUND,
      );

    return bono;
  }

  async deleteBono(id: number) {
    const bono = await this.bonoRepository.findOne({ where: { id } });
    if (!bono)
      throw new BussinessLogicException(
        'El bono con el codigo dado no existe',
        BussinessError.NOT_FOUND,
      );

    await this.bonoRepository.remove(bono);
  }
}
