import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { SameAs } from '../../../common/decorators/same-as.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "First name of the user" })
  first_name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: "Optional middle name of the user", required: false })
  middle_name?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Last name of the user" })
  last_name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: "Email of the user" })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/[a-z]/, { message: 'password must consist an lowercase' })
  @Matches(/[A-Z]/, { message: 'password must consist an uppercase' })
  @Matches(/[0-9]/, { message: 'password must consist a digit' })
  @Matches(/.{8,}/, { message: 'password must be atleast 8 chars long' })
  @Matches(/\W|_/, { message: 'password must consist a special character' })
  @ApiProperty({ description: "Password of the user" })
  password: string;

  @SameAs<CreateUserDto>('password')
  @Exclude({ toPlainOnly: true })
  @ApiProperty({ description: "Confirmation" })
  password_confirmation: string;
}
