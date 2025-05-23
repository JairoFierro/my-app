import { BonoEntity } from 'src/bono/bono.entity';
import { ClaseEntity } from 'src/clase/clase.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Rol {
  PROFESOR = 'Profesor',
  DECANA = 'Decana',
}

@Entity()
export class UsuarioEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  numeroCedula: number;

  @Column()
  nombre: string;

  @Column()
  grupoInvestigacion: string;

  @Column()
  numeroExtension: number;

  @Column({
    type: 'enum',
    enum: Rol,
  })
  rol: string;

  @OneToOne(() => UsuarioEntity, (user) => user.jefe)
  jefe: UsuarioEntity;

  @OneToMany(() => UsuarioEntity, (usuario) => usuario.jefe)
  subordinados: UsuarioEntity[];

  @OneToMany(() => ClaseEntity, (clase) => clase.usuario)
  clases: ClaseEntity[];

  @OneToMany(() => BonoEntity, (bono) => bono.usuario)
  bonos: BonoEntity[];
}
