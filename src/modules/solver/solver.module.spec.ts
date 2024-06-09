import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule } from '@nestjs/cache-manager';
import { SolverController } from './controllers/solver.controller';
import { SolverService } from './services/solver.service';
import { SolverModule } from './solver.module';

describe('SolverModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [CacheModule.register(), SolverModule],
    }).compile();
  });

  it('should compile the module', async () => {
    const compiledModule = module.get<SolverModule>(SolverModule);
    expect(compiledModule).toBeDefined();
  });

  it('should have SolverController', () => {
    const controller = module.get<SolverController>(SolverController);
    expect(controller).toBeDefined();
  });

  it('should have SolverService', () => {
    const service = module.get<SolverService>(SolverService);
    expect(service).toBeDefined();
  });
});