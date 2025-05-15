import { Injectable } from '@nestjs/common';
import { BonoEntity } from './bono.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';

@Injectable()
export class BonoService {
  constructor(
    @InjectRepository(BonoEntity)
    private readonly bonoRepository: Repository<BonoEntity>,
  ) {}

  async crearBono(newBono: BonoEntity): Promise<BonoEntity> {
    if (newBono.monto == null) {
      throw new BusinessLogicException(
        'El monto no puede ser vacío',
        BusinessError.PRECONDITION_FAILED,
      );
    }

    if (newBono.monto <= 0) {
      throw new BusinessLogicException(
        'El monto no puede ser negativo',
        BusinessError.PRECONDITION_FAILED,
      );
    }

    if (newBono.usuario.rol !== 'Profesor') {
      throw new BusinessLogicException(
        'Debes ser un profesor para crear un bono',
        BusinessError.PRECONDITION_FAILED,
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
      throw new BusinessLogicException(
        'El bono con el codigo dado no existe',
        BusinessError.NOT_FOUND,
      );

    return bono;
  }

  async deleteBono(id: number) {
    const bono = await this.bonoRepository.findOne({ where: { id } });
    if (!bono)
      throw new BusinessLogicException(
        'El bono con el codigo dado no existe',
        BusinessError.NOT_FOUND,
      );

    await this.bonoRepository.remove(bono);
  }
}
