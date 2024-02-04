import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";
import { SameAs } from "../../../common/decorators/same-as.decorator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    first_name: string;
    
    @IsString()
    @IsOptional()
    middle_name?: string;
    
    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/[a-z]/, { message: 'password must consist an lowercase' })
    @Matches(/[A-Z]/, { message: 'password must consist an uppercase' })
    @Matches(/[0-9]/, { message: 'password must consist a digit' })
    @Matches(/.{8,}/, { message: 'password must be atleast 8 chars long' })
    @Matches(/\W|_/, { message: 'password must consist a special character' })
    password: string;
  
    @SameAs<CreateUserDto>('password')
    @Exclude({ toPlainOnly: true })
    password_confirmation: string;
}