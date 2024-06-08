import { Body, Controller, Post } from '@nestjs/common';
import { PuzzleDto } from '../dtos/puzzleDto';
import { SolverService } from '../services/solver.service';

@Controller('solver')
export class SolverController {
    constructor(private readonly solverService: SolverService) {}

    @Post('/solution') 
    findSolution(@Body() body: PuzzleDto){
        return this.solverService.findSolution(body);
    }
}
