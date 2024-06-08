import { Module } from '@nestjs/common';
import { SolverController } from './controllers/solver.controller';
import { SolverService } from './services/solver.service';

@Module({
  controllers: [SolverController],
  providers: [SolverService]
})
export class SolverModule {}
