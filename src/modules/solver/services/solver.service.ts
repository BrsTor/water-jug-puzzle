import { BadRequestException, Injectable } from '@nestjs/common';
import { PuzzleDto } from '../dtos/puzzleDto';
import { SteinAlgorithm } from '../algorithms/stein.algorithm';

@Injectable()
export class SolverService {

    findSolution(puzzle: PuzzleDto) {

        const max_capacity = Math.max(puzzle.x_capacity, puzzle.y_capacity);
        if (puzzle.z_amount_wanted > max_capacity) {
            throw new BadRequestException("No solution.",
                {
                    cause: new Error(),
                    description: `The value of the amount wanted (${puzzle.z_amount_wanted}), can't be greater than the capacities of the jugs (${puzzle.x_capacity}, ${puzzle.y_capacity}).`
                });
        }

        const gcd = SteinAlgorithm.findGCD(puzzle.x_capacity, puzzle.y_capacity);
        if (puzzle.z_amount_wanted % gcd !== 0) {
            throw new BadRequestException("No solution.",
                {
                    cause: new Error(),
                    description: `The value of the amount wanted (${puzzle.z_amount_wanted}), must be a multiple of the GCD (${gcd}) of the jugs (${puzzle.x_capacity}, ${puzzle.y_capacity}).`
                });
        }

        // TODO: Add logic here to solve the puzzle if the problem is solvable
    }

    
}