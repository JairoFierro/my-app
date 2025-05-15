import { Test, TestingModule } from '@nestjs/testing';
import { BonoUsuarioService } from './bono-usuario.service';

describe('BonoUsuarioService', () => {
  let service: BonoUsuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BonoUsuarioService],
    }).compile();

    service = module.get<BonoUsuarioService>(BonoUsuarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
