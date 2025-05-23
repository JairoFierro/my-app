import { ClaseEntity } from 'src/clase/clase.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BonoEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  monto: number;

  @Column({ type: 'double precision' })
  calificacion: number;

  @Column()
  palabraClave: string;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.bonos)
  usuario: UsuarioEntity;

  @ManyToOne(() => ClaseEntity, (clase) => clase.bonos)
  clase: ClaseEntity;
}
