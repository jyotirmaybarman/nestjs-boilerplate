import { IsOptional, IsString } from "class-validator";

export class UpdateuserDto {
    @IsOptional()
    @IsString()
    first_name?: string;
    
    @IsOptional()
    @IsString()
    middle_name?: string;
    
    @IsOptional()
    @IsString()
    last_name?: string;
    
    @IsOptional()
    @IsString()
    email?: string;
}