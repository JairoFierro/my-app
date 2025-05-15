import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { BonoModule } from './bono/bono.module';
import { ClaseModule } from './clase/clase.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario/usuario.entity';
import { BonoEntity } from './bono/bono.entity';
import { ClaseEntity } from './clase/clase.entity';
import { BonoUsuarioService } from './bono-usuario/bono-usuario.service';
import { BonoClaseService } from './bono-clase/bono-clase.service';
import { ClaseUsuarioService } from './clase-usuario/clase-usuario.service';
import { ClaseBonoModule } from './clase-bono/clase-bono.module';

@Module({
  imports: [
    UsuarioModule,
    BonoModule,
    ClaseModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'postgres',
      password: 'jafie',
      database: 'preparcial',
      entities: [UsuarioEntity, BonoEntity, ClaseEntity],
      dropSchema: true,
      synchronize: true,
    }),
    ClaseBonoModule,
  ],
  controllers: [AppController],
  providers: [AppService, BonoUsuarioService, BonoClaseService, ClaseUsuarioService],
})
export class AppModule {}
