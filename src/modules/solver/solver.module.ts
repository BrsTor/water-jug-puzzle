import { Module } from '@nestjs/common';
import { SolverController } from './controllers/solver.controller';
import { SolverService } from './services/solver.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  controllers: [SolverController],
  providers: [SolverService],
  imports: [CacheModule.register()]
})
export class SolverModule {}
