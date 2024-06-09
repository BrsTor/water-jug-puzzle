import { Test, TestingModule } from '@nestjs/testing';
import { SolverService } from './solver.service';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { BadRequestException, GatewayTimeoutException } from '@nestjs/common';
import { PuzzleDto } from '../dtos/puzzleDto';
import { SteinAlgorithm } from '../algorithms/stein.algorithm';
import { Cache } from 'cache-manager';

describe('SolverService', () => {
  let solverService: SolverService;
  let cacheManager: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [SolverService],
    }).compile();

    solverService = module.get<SolverService>(SolverService);
    cacheManager = module.get<Cache>(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(solverService).toBeDefined();
  });

  it('should throw BadRequestException if z_amount_wanted is greater than max capacity', async () => {
    const puzzleDto: PuzzleDto = {
      x_capacity: 3,
      y_capacity: 5,
      z_amount_wanted: 6,
    };

    await expect(solverService.findSolution(puzzleDto)).rejects.toThrow(BadRequestException);
  });

  it('should throw BadRequestException if z_amount_wanted is not a multiple of gcd', async () => {
    const puzzleDto: PuzzleDto = {
      x_capacity: 2,
      y_capacity: 8,
      z_amount_wanted: 7,
    };

    jest.spyOn(SteinAlgorithm, 'findGCD').mockReturnValue(2);

    await expect(solverService.findSolution(puzzleDto)).rejects.toThrow(BadRequestException);
  });

  it('should return cached solution if available', async () => {
    const puzzleDto: PuzzleDto = {
      x_capacity: 3,
      y_capacity: 5,
      z_amount_wanted: 4,
    };

    const cachedSolution = [{ step: 1, bucketX: 3, bucketY: 0, action: 'Fill Bucket X' }];
    jest.spyOn(cacheManager, 'get').mockResolvedValue(cachedSolution);

    expect(await solverService.findSolution(puzzleDto)).toEqual({ solution: cachedSolution });
  });

  it('should cache and return the solution if not cached', async () => {
    const puzzleDto: PuzzleDto = {
      x_capacity: 3,
      y_capacity: 5,
      z_amount_wanted: 4,
    };

    const solution = [{ step: 1, bucketX: 3, bucketY: 0, action: 'Fill Bucket X' }];
    jest.spyOn(solverService, 'solvePuzzle').mockReturnValue(solution);

    jest.spyOn(cacheManager, 'get').mockResolvedValue(null);
    jest.spyOn(cacheManager, 'set').mockResolvedValue(null);

    expect(await solverService.findSolution(puzzleDto)).toEqual({ solution });
    expect(cacheManager.set).toHaveBeenCalledWith('3-5-4', solution);
  });

  it('should throw GatewayTimeoutException if the solution takes too long', async () => {
    jest.spyOn(solverService, 'solvePuzzle').mockImplementation(() => {
      throw new GatewayTimeoutException();
    });

    const puzzleDto: PuzzleDto = {
      x_capacity: 3,
      y_capacity: 5,
      z_amount_wanted: 4,
    };

    await expect(solverService.findSolution(puzzleDto)).rejects.toThrow(GatewayTimeoutException);
  });

  it('should return the correct solution for a simple puzzle', async () => {
    const puzzleDto: PuzzleDto = {
      x_capacity: 1,
      y_capacity: 3,
      z_amount_wanted: 2,
    };

    const expectedSolution = {solution: [
      { step: 1, bucketX: 0, bucketY: 3, action: 'Fill Bucket Y' },
      {
        step: 2,
        bucketX: 1,
        bucketY: 2,
        action: 'Transfer 1 from Bucket Y to Bucket X',
        status: 'Solved'
      }
    ]}

    const solution = await solverService.findSolution(puzzleDto);
    expect(solution).toEqual(expectedSolution);
  });
});