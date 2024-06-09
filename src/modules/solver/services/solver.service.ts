import { BadRequestException, GatewayTimeoutException, Injectable } from '@nestjs/common';
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

        const timeout = 5000;
        const solution = this.solvePuzzle(puzzle.x_capacity, puzzle.y_capacity, puzzle.z_amount_wanted, timeout, Date.now());
        return { solution };
    }

    solvePuzzle(X: number, Y: number, Z: number, timeout: number, startTime: number): { step: number, bucketX: number, bucketY: number, action: string, status?: string }[] {
        // Initialize arrays to track the optimal solution
        const solution: { step: number, bucketX: number, bucketY: number, action: string, status?: string }[] = [];
        let step = 0;

        // Perform BFS to find the optimal solution
        let found = false;
        let visited: Set<string> = new Set();
        let queue: { bucketX: number, bucketY: number, actions: { step: number, bucketX: number, bucketY: number, action: string, status?: string }[] }[] = [{
            bucketX: 0,
            bucketY: 0,
            actions: []
        }];

        while (queue.length > 0 && !found) {
            if (Date.now() - startTime > timeout) {
                throw new GatewayTimeoutException("Timeout",
                    {
                        cause: new Error(),
                        description: `The algorithm took too long to find a solution.`
                    });
            }

            const { bucketX, bucketY, actions } = queue.shift() as { bucketX: number, bucketY: number, actions: { step: number, bucketX: number, bucketY: number, action: string, status?: string }[] };

            visited.add(`${bucketX},${bucketY}`);

            if (bucketX === Z || bucketY === Z) {
                solution.push(...actions);
                solution.at(-1).status = "Solved"
                found = true;
                break;
            }

            const newStateActions = this.generateNextStates(bucketX, bucketY, X, Y);
            for (const newStateAction of newStateActions) {
                const { newBucketX, newBucketY, newActions } = newStateAction;
                if (!visited.has(`${newBucketX},${newBucketY}`)) {
                    queue.push({
                        bucketX: newBucketX,
                        bucketY: newBucketY,
                        actions: [
                            ...actions,
                            ...newActions.map((action, index) => ({
                                step: actions.length + index + 1,
                                bucketX: newBucketX,
                                bucketY: newBucketY,
                                action: action.action
                            }))
                        ]
                    });
                }
            }
        }

        return solution;
    }

    generateNextStates(bucketX: number, bucketY: number, X: number, Y: number): { newBucketX: number, newBucketY: number, newActions: { step: number, bucketX: number, bucketY: number, action: string }[] }[] {
        const nextStates: { newBucketX: number, newBucketY: number, newActions: { step: number, bucketX: number, bucketY: number, action: string }[] }[] = [];

        // Fill Bucket X to its capacity
        if (bucketX < X) {
            nextStates.push({ newBucketX: X, newBucketY: bucketY, newActions: [{ step: 0, bucketX: X, bucketY: bucketY, action: "Fill Bucket X" }] });
        }
        // Fill Bucket Y to its capacity
        if (bucketY < Y) {
            nextStates.push({ newBucketX: bucketX, newBucketY: Y, newActions: [{ step: 0, bucketX: bucketX, bucketY: Y, action: "Fill Bucket Y" }] });
        }
        // Empty Bucket X
        if (bucketX > 0) {
            nextStates.push({ newBucketX: 0, newBucketY: bucketY, newActions: [{ step: 0, bucketX: 0, bucketY: bucketY, action: "Empty Bucket X" }] });
        }
        // Empty Bucket Y
        if (bucketY > 0) {
            nextStates.push({ newBucketX: bucketX, newBucketY: 0, newActions: [{ step: 0, bucketX: bucketX, bucketY: 0, action: "Empty Bucket Y" }] });
        }
        // Pour water from Bucket Y to Bucket X
        if (bucketX < X && bucketY > 0) {
            const pourAmount = Math.min(bucketY, X - bucketX);
            nextStates.push({ newBucketX: bucketX + pourAmount, newBucketY: bucketY - pourAmount, newActions: [{ step: 0, bucketX: bucketX + pourAmount, bucketY: bucketY - pourAmount, action: `Transfer ${pourAmount} from Bucket Y to Bucket X` }] });
        }
        // Pour water from Bucket X to Bucket Y
        if (bucketY < Y && bucketX > 0) {
            const pourAmount = Math.min(bucketX, Y - bucketY);
            nextStates.push({ newBucketX: bucketX - pourAmount, newBucketY: bucketY + pourAmount, newActions: [{ step: 0, bucketX: bucketX - pourAmount, bucketY: bucketY + pourAmount, action: `Transfer ${pourAmount} from Bucket X to Bucket Y` }] });
        }

        return nextStates;
    }
}