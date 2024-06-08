import { IsNotEmpty, IsNumber, IsPositive, Max } from "class-validator";

export class PuzzleDto {

    @IsNotEmpty()
    @Max(5000)
    @IsPositive()
    @IsNumber()
    x_capacity: number;

    @IsNotEmpty()
    @Max(5000)
    @IsPositive()
    @IsNumber()
    y_capacity: number;

    @IsNotEmpty()
    @Max(5000)
    @IsPositive()
    @IsNumber()    
    z_amount_wanted: number;
}