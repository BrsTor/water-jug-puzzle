import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class ActionDto {

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    step: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    bucketX: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)  
    bucketY: number;

    @IsNotEmpty()
    @IsString()
    action: string;

    @IsOptional()
    @IsString()
    status?: string;
}