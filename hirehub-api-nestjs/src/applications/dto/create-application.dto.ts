import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto {
  @ApiProperty({ example: 'I am highly interested in this role...', required: false })
  @IsOptional()
  @IsString()
  cover_letter?: string;
}
