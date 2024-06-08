import { NestFactory } from '@nestjs/core';
import { SolverModule } from './modules/solver/solver.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(SolverModule);

  app.useGlobalPipes(
    new ValidationPipe({
        whitelist: true
    })
)

  await app.listen(3000);
}
bootstrap();
