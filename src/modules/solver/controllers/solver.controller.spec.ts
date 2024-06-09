import { Test, TestingModule } from '@nestjs/testing';
import { SolverController } from './solver.controller';
import { SolverService } from '../services/solver.service';
import { PuzzleDto } from '../dtos/puzzleDto';

describe('SolverController', () => {
  let solverController: SolverController;
  let solverService: SolverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolverController],
      providers: [
        {
          provide: SolverService,
          useValue: {
            findSolution: jest.fn(),
          },
        },
      ],
    }).compile();

    solverController = module.get<SolverController>(SolverController);
    solverService = module.get<SolverService>(SolverService);
  });

  it('should be defined', () => {
    expect(solverController).toBeDefined();
  });

  it('should call findSolution on solverService with correct parameters', async () => {
    const puzzleDto: PuzzleDto = {
      x_capacity: 5,
      y_capacity: 3,
      z_amount_wanted: 4,
    };

    const solution = { solution: 'mockSolution' };
    jest.spyOn(solverService, 'findSolution').mockResolvedValue(solution);

    expect(await solverController.findSolution(puzzleDto)).toBe(solution);
    expect(solverService.findSolution).toHaveBeenCalledWith(puzzleDto);
  });
});
