import { Injectable } from '@nestjs/common';
import { ClaseEntity } from './clase.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class ClaseService {
  constructor(
    @InjectRepository(ClaseEntity)
    private readonly claseRepository: Repository<ClaseEntity>,
  ) {}

  async crearClase(newClase: ClaseEntity): Promise<ClaseEntity> {
    if (newClase.codigo.length !== 10) {
      throw new BusinessLogicException(
        'El codigo debe tener 10 caracteres',
        BusinessError.PRECONDITION_FAILED,
      );
    }

    const clase = this.claseRepository.save(newClase);
    return clase;
  }

  async findClaseById(id: number): Promise<ClaseEntity> {
    const clase = await this.claseRepository.findOne({
      where: { id },
    });
    if (!clase) {
      throw new BusinessLogicException(
        'La clase con el id dado no existe',
        BusinessError.NOT_FOUND,
      );
    }

    return clase;
  }
}
