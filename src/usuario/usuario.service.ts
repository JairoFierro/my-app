import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async crearUsuario(newUser: UsuarioEntity): Promise<UsuarioEntity> {
    if (newUser.rol === 'Profesor') {
      const gruposValidos = ['TICSW', 'IMAGINE', 'COMIT'];
      if (!gruposValidos.includes(newUser.grupoInvestigacion)) {
        throw new BusinessLogicException(
          'El grupo de investigacion no es valido',
          BusinessError.PRECONDITION_FAILED,
        );
      }
    }

    if (newUser.rol === 'Decana') {
      if (newUser.numeroExtension.toString().length !== 8) {
        throw new BusinessLogicException(
          'El numero de extension no es valido',
          BusinessError.PRECONDITION_FAILED,
        );
      }
    }
    const usuario = this.usuarioRepository.save(newUser);
    return usuario;
  }

  async findUsuarioById(id: number): Promise<UsuarioEntity> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
    });
    if (!usuario) {
      throw new BusinessLogicException(
        'The user with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }

    return usuario;
  }

  async eliminarUsuario(id: number) {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
    });
    if (!usuario) {
      throw new BusinessLogicException(
        'The user with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }

    if (usuario.rol === 'Decana' || usuario.bonos.length > 0) {
      throw new BusinessLogicException(
        'The user with the given id can not be deleted',
        BusinessError.NOT_FOUND,
      );
    }

    await this.usuarioRepository.remove(usuario);
  }
}
