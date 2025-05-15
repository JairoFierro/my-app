import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BussinessError,
  BussinessLogicException,
} from '../shared/errors/business-errors';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { BonoEntity } from 'src/bono/bono.entity';

@Injectable()
export class BonoUsuarioService {
  constructor(
    @InjectRepository(BonoEntity)
    private readonly bonoRepository: Repository<BonoEntity>,

    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async findAllBonosByUsuario(userId: number): Promise<BonoEntity[]> {
    const user = await this.usuarioRepository.findOne({
      where: { id: userId },
      relations: ['bonos'],
    });
    if (!user)
      throw new BussinessLogicException(
        'The user with the given id was not found',
        BussinessError.NOT_FOUND,
      );
    return user.bonos;
  }
}
