import { IsString, IsEnum, IsOptional, IsNumber, Min } from 'class-validator';
import { JobType, JobStatus } from '../job.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDto {
  @ApiProperty({ example: 'Software Engineer' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Looking for a skilled backend engineer.' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'Tech Corp' })
  @IsString()
  company: string;

  @ApiProperty({ example: 'Remote', required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ example: 80000, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  salary_min?: number;

  @ApiProperty({ example: 120000, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  salary_max?: number;

  @ApiProperty({ enum: JobType, example: JobType.FULL_TIME })
  @IsEnum(JobType)
  job_type: JobType;

  @ApiProperty({ enum: JobStatus, example: JobStatus.ACTIVE, required: false })
  @IsOptional()
  @IsEnum(JobStatus)
  status?: JobStatus;
}
