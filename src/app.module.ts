import { Module } from '@nestjs/common';
import { SolverModule } from './modules/solver/solver.module';

@Module({
  imports: [SolverModule],
})
export class AppModule {}
