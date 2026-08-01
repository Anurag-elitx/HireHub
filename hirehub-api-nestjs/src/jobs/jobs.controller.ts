import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { FilterJobsDto } from './dto/filter-jobs.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../users/user.entity';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(Role.EMPLOYER)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new job (Employer only)' })
  create(@Body() createJobDto: CreateJobDto, @Request() req: { user: { id: string } }) {
    return this.jobsService.create(createJobDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active jobs with filtering and pagination' })
  findAll(@Query() filterDto: FilterJobsDto) {
    return this.jobsService.findAll(filterDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get job details by ID' })
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.EMPLOYER)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Update a job (Employer only, must own)' })
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto, @Request() req: { user: { id: string } }) {
    return this.jobsService.update(id, updateJobDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.EMPLOYER)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a job (Employer only, must own)' })
  remove(@Param('id') id: string, @Request() req: { user: { id: string } }) {
    return this.jobsService.remove(id, req.user.id);
  }
}
