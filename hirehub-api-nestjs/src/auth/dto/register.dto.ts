import { IsEmail, IsEnum, MinLength, IsString } from 'class-validator';
import { Role } from '../../users/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @MinLength(8)
  password: string;

  @ApiProperty({ enum: Role, example: Role.CANDIDATE })
  @IsEnum(Role)
  role: Role;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  full_name: string;
}
