import { IsOptional, IsString, IsEnum, IsNumberString } from 'class-validator';
import { JobType } from '../job.entity';
import { ApiProperty } from '@nestjs/swagger';

export class FilterJobsDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ enum: JobType, required: false })
  @IsOptional()
  @IsEnum(JobType)
  job_type?: JobType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ required: false, default: '1' })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiProperty({ required: false, default: '10' })
  @IsOptional()
  @IsNumberString()
  limit?: string;
}
