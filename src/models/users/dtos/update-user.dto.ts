import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateuserDto {
    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    first_name?: string;
    
    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    middle_name?: string;
    
    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    last_name?: string;
    
    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    email?: string;
}